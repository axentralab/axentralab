const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Referral = require('../models/Referral');
const { v4: uuidv4 } = require('uuid');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '7d' });

const generateReferralCode = () => {
  return uuidv4().slice(0, 12).toUpperCase();
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, company, referralCode } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ success: false, message: 'All fields required' });

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ success: false, message: 'Email already registered' });

    // Create user with new referral code
    const newReferralCode = generateReferralCode();
    const user = await User.create({ name, email, password, company, referralCode: newReferralCode });
    
    // Handle referral if referralCode provided
    let referralRecord = null;
    if (referralCode && referralCode.trim()) {
      const referrer = await User.findOne({ referralCode: referralCode.toUpperCase() });
      if (referrer) {
        referralRecord = await Referral.create({
          referrer: referrer._id,
          referee: user._id,
          referralCode: referralCode.toUpperCase(),
          referralLink: `${process.env.FRONTEND_URL || 'http://localhost:3000'}?ref=${referralCode.toUpperCase()}`,
          refereeEmail: email,
          status: 'activated',
          activatedAt: new Date(),
        });
      }
    }

    const token = signToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: { _id: user._id, name: user.name, email: user.email, role: user.role, company: user.company, referralCode: newReferralCode },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: 'Email and password required' });

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password)))
      return res.status(401).json({ success: false, message: 'Invalid credentials' });

    if (!user.isActive)
      return res.status(403).json({ success: false, message: 'Account suspended' });

    const token = signToken(user._id);
    res.json({
      success: true,
      token,
      user: { _id: user._id, name: user.name, email: user.email, role: user.role, company: user.company },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getMe = async (req, res) => {
  res.json({ success: true, user: req.user });
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, company, phone } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, { name, company, phone }, { new: true });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select('+password');
    if (!(await user.matchPassword(currentPassword)))
      return res.status(400).json({ success: false, message: 'Current password incorrect' });
    user.password = newPassword;
    await user.save();
    res.json({ success: true, message: 'Password updated' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
