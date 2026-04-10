const Referral = require('../models/Referral');
const User = require('../models/User');

// Generate unique referral code
const generateReferralCode = () => {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};

// Get or create referral code for user
exports.getOrCreateReferralCode = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check if user already has a referral code
    let existingReferral = await Referral.findOne({ referrer: userId });
    
    if (existingReferral) {
      return res.json({
        success: true,
        data: {
          referralCode: existingReferral.referralCode,
          referralLink: existingReferral.referralLink,
          createdAt: existingReferral.createdAt,
        },
      });
    }

    // Create new referral code
    const referralCode = generateReferralCode();
    const referralLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/register?ref=${referralCode}`;

    const newReferral = await Referral.create({
      referrer: userId,
      referee: null,
      referralCode,
      referralLink,
      refereeEmail: '',
    });

    res.json({
      success: true,
      data: {
        referralCode: newReferral.referralCode,
        referralLink: newReferral.referralLink,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get referral stats for user
exports.getReferralStats = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const totalReferrals = await Referral.countDocuments({ referrer: userId });
    const activeReferrals = await Referral.countDocuments({ 
      referrer: userId, 
      status: 'activated' 
    });
    const completedReferrals = await Referral.countDocuments({ 
      referrer: userId, 
      status: 'completed' 
    });
    
    const totalEarnings = await Referral.aggregate([
      { $match: { referrer: userId, status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$commissionAmount' } } },
    ]);

    res.json({
      success: true,
      data: {
        totalReferrals,
        activeReferrals,
        completedReferrals,
        totalEarnings: totalEarnings[0]?.total || 0,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get referral history
exports.getReferralHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const referrals = await Referral.find({ referrer: userId })
      .populate('referee', 'name email')
      .sort('-createdAt')
      .skip(skip)
      .limit(limit);

    const total = await Referral.countDocuments({ referrer: userId });

    res.json({
      success: true,
      data: referrals,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: page,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Verify referral code and register with referral
exports.registerWithReferral = async (req, res) => {
  try {
    const { referralCode } = req.body;
    
    if (!referralCode) {
      return res.status(400).json({ success: false, message: 'Referral code required' });
    }

    const referral = await Referral.findOne({ referralCode });
    
    if (!referral) {
      return res.status(404).json({ success: false, message: 'Invalid referral code' });
    }

    res.json({
      success: true,
      data: {
        referrerName: referral.referrer.name,
        referralCode,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Admin: Mark referral as completed
exports.completeReferral = async (req, res) => {
  try {
    const { referralId, orderValue } = req.body;

    const referral = await Referral.findById(referralId);
    if (!referral) {
      return res.status(404).json({ success: false, message: 'Referral not found' });
    }

    const commissionAmount = (orderValue * referral.commissionPercentage) / 100;

    referral.status = 'completed';
    referral.orderValue = orderValue;
    referral.commissionAmount = commissionAmount;
    referral.completedAt = new Date();

    await referral.save();

    res.json({
      success: true,
      data: referral,
      message: `Commission of ${commissionAmount} added for referral`,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all referrals (admin only)
exports.getAllReferrals = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const status = req.query.status || null;

    const query = status ? { status } : {};
    
    const referrals = await Referral.find(query)
      .populate('referrer', 'name email')
      .populate('referee', 'name email')
      .sort('-createdAt')
      .skip(skip)
      .limit(limit);

    const total = await Referral.countDocuments(query);

    res.json({
      success: true,
      data: referrals,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: page,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
