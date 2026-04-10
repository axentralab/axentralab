const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Referral = require('../models/Referral');
const User = require('../models/User');
const Order = require('../models/Order');

// ── Tier Calculation Function ──────────────────────────────────────────────
const calculateTier = (referralCount) => {
  if (referralCount >= 10) {
    return { 
      tier: 'vip_elite', 
      commission: 25, 
      bounty: 200,
      name: 'VIP Elite Partner',
      badge: '💎'
    };
  }
  if (referralCount >= 6) {
    return { 
      tier: 'gold', 
      commission: 20, 
      bounty: 200,
      name: 'Gold Partner',
      badge: '🥇'
    };
  }
  if (referralCount >= 3) {
    return { 
      tier: 'silver', 
      commission: 17, 
      bounty: 0,
      name: 'Silver Partner',
      badge: '🥈'
    };
  }
  return { 
    tier: 'bronze', 
    commission: 15, 
    bounty: 0,
    name: 'Bronze Partner',
    badge: '🥉'
  };
};

/**
 * @route   GET /api/referrals/my-referrals
 * @desc    Get logged-in user's referral info and earnings
 * @access  Private
 */
router.get('/my-referrals', protect, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get user's referral code
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get all referrals made by this user
    const referrals = await Referral.find({ referrer: userId })
      .populate('referee', 'name email')
      .sort('-createdAt');

    // Calculate totals
    const totalCommission = referrals.reduce((sum, ref) => sum + (ref.commissionAmount || 0), 0);
    const totalBounties = referrals.reduce((sum, ref) => sum + (ref.bountyAmount || 0), 0);
    const activeReferrals = referrals.filter(ref => ref.status === 'activated' || ref.status === 'completed').length;
    const completedReferrals = referrals.filter(ref => ref.status === 'completed').length;

    // Get current tier
    const tierInfo = calculateTier(completedReferrals);

    // Build referral link
    const referralLink = user.referralCode ? `${process.env.FRONTEND_URL || 'http://localhost:3000'}?ref=${user.referralCode}` : null;

    // Calculate progress to next tier
    let nextTierAt = null;
    let progressPercent = 0;
    if (tierInfo.tier === 'bronze') nextTierAt = 3;
    else if (tierInfo.tier === 'silver') nextTierAt = 6;
    else if (tierInfo.tier === 'gold') nextTierAt = 10;
    
    if (nextTierAt) {
      progressPercent = Math.min(100, (completedReferrals / nextTierAt) * 100);
    } else {
      progressPercent = 100;
    }

    res.json({
      success: true,
      referralCode: user.referralCode,
      referralLink,
      tier: tierInfo,
      statistics: {
        totalReferrals: referrals.length,
        activeReferrals,
        completedReferrals,
        totalEarnings: totalCommission + totalBounties,
        totalCommission,
        totalBounties,
        currentTier: tierInfo.tier,
        tierName: tierInfo.name,
        currentCommission: tierInfo.commission,
        currentBounty: tierInfo.bounty,
        nextTierAt,
        progressPercent: Math.round(progressPercent),
        remainingToNextTier: nextTierAt ? Math.max(0, nextTierAt - completedReferrals) : 0,
        isMaxTier: tierInfo.tier === 'vip_elite',
      },
      referrals,
    });
  } catch (error) {
    console.error('Error fetching referrals:', error);
    res.status(500).json({ message: 'Error fetching referrals', error: error.message });
  }
});

/**
 * @route   POST /api/referrals/create-referral
 * @desc    Create a new referral
 * @access  Private
 */
router.post('/create-referral', protect, async (req, res) => {
  try {
    const { refereeEmail } = req.body;
    const referrerId = req.user.id;

    if (!refereeEmail) {
      return res.status(400).json({ message: 'Referee email is required' });
    }

    // Check if referee exists
    const referee = await User.findOne({ email: refereeEmail });
    if (!referee) {
      return res.status(404).json({ message: 'Referee email not found' });
    }

    if (referee.id === referrerId) {
      return res.status(400).json({ message: 'Cannot refer yourself' });
    }

    // Check if referral already exists
    const existingReferral = await Referral.findOne({ 
      referrer: referrerId, 
      referee: referee.id 
    });

    if (existingReferral) {
      return res.status(400).json({ message: 'You have already referred this user' });
    }

    // Generate unique referral code
    const referralCode = `${req.user._id.toString().slice(-8)}-${Date.now()}`.toUpperCase();
    const referralLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}?ref=${referralCode}`;

    // Create referral
    const referral = new Referral({
      referrer: referrerId,
      referee: referee.id,
      referralCode,
      referralLink,
      refereeEmail,
    });

    await referral.save();

    res.json({
      success: true,
      message: 'Referral created successfully',
      referral,
    });
  } catch (error) {
    console.error('Error creating referral:', error);
    res.status(500).json({ message: 'Error creating referral', error: error.message });
  }
});

/**
 * @route   POST /api/referrals/apply-referral-code
 * @desc    Apply referral code when user registers or makes purchase
 * @access  Public
 */
router.post('/apply-referral-code', async (req, res) => {
  try {
    const { referralCode, refereeEmail } = req.body;

    if (!referralCode || !refereeEmail) {
      return res.status(400).json({ message: 'Referral code and email are required' });
    }

    // Find referral by code
    const referral = await Referral.findOne({ referralCode });
    if (!referral) {
      return res.status(404).json({ message: 'Invalid referral code' });
    }

    // Check if referee email matches
    if (referral.refereeEmail.toLowerCase() !== refereeEmail.toLowerCase()) {
      return res.status(400).json({ message: 'Email does not match referral' });
    }

    // Update referral status to activated
    if (referral.status === 'pending') {
      referral.status = 'activated';
      referral.activatedAt = new Date();
      await referral.save();
    }

    res.json({
      success: true,
      message: 'Referral code applied successfully',
      commissionPercentage: referral.commissionPercentage,
    });
  } catch (error) {
    console.error('Error applying referral code:', error);
    res.status(500).json({ message: 'Error applying referral code', error: error.message });
  }
});

/**
 * @route   PUT /api/referrals/update-commission/:referralId
 * @desc    Update commission when referral completes a purchase
 * @access  Private (Admin only)
 */
router.put('/update-commission/:referralId', protect, async (req, res) => {
  try {
    const { orderValue } = req.body;
    const referralId = req.params.referralId;

    const referral = await Referral.findById(referralId)
      .populate('referrer');
    if (!referral) {
      return res.status(404).json({ message: 'Referral not found' });
    }

    // Get referrer's tier based on completed referrals
    const completedCount = await Referral.countDocuments({
      referrer: referral.referrer._id,
      status: 'completed'
    });
    
    const tierInfo = calculateTier(completedCount);

    // Calculate commission with percentage
    const commissionAmount = (orderValue * tierInfo.commission) / 100;
    
    // Add bounty for high-ticket clients ($1000+)
    let bountyAmount = 0;
    if (orderValue >= 1000 && tierInfo.bounty > 0) {
      bountyAmount = tierInfo.bounty;
    }

    const totalEarnings = commissionAmount + bountyAmount;

    referral.tier = tierInfo.tier;
    referral.tierName = tierInfo.name;
    referral.commissionPercentage = tierInfo.commission;
    referral.projectValue = orderValue;
    referral.isHighTicket = orderValue >= 1000;
    referral.commissionAmount = commissionAmount;
    referral.bountyAmount = bountyAmount;
    referral.status = 'completed';
    referral.completedAt = new Date();

    await referral.save();

    // Update user's referral earnings
    await User.findByIdAndUpdate(
      referral.referrer._id,
      { $inc: { referralEarnings: totalEarnings } }
    );

    res.json({
      success: true,
      message: 'Commission updated successfully',
      earnings: {
        commission: commissionAmount,
        bounty: bountyAmount,
        total: totalEarnings,
        tier: tierInfo.tier,
        tierName: tierInfo.name,
        tierBadge: tierInfo.badge,
      },
      referral,
    });
  } catch (error) {
    console.error('Error updating commission:', error);
    res.status(500).json({ message: 'Error updating commission', error: error.message });
  }
});

/**
 * @route   GET /api/referrals/check-ref/:code
 * @desc    Check if referral code is valid
 * @access  Public
 */
router.get('/check-ref/:code', async (req, res) => {
  try {
    const referral = await Referral.findOne({ referralCode: req.params.code })
      .populate('referrer', 'name company');

    if (!referral) {
      return res.json({ valid: false });
    }

    res.json({
      valid: true,
      referrerName: referral.referrer.name,
      commission: referral.commissionPercentage,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error checking referral code' });
  }
});

/**
 * @route   GET /api/referrals/stats
 * @desc    Get referral statistics (admin only)
 * @access  Private
 */
router.get('/stats', protect, async (req, res) => {
  try {
    const totalReferrals = await Referral.countDocuments();
    const activeReferrals = await Referral.countDocuments({ status: { $in: ['activated', 'completed'] } });
    const completedReferrals = await Referral.countDocuments({ status: 'completed' });
    const totalCommissions = await Referral.aggregate([
      { $group: { _id: null, total: { $sum: '$commissionAmount' } } }
    ]);

    res.json({
      success: true,
      statistics: {
        totalReferrals,
        activeReferrals,
        completedReferrals,
        totalCommissions: totalCommissions[0]?.total || 0,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics' });
  }
});

module.exports = router;
