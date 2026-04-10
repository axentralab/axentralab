/**
 * Development Auth Routes
 * Uses in-memory store instead of MongoDB
 * Automatically used when MONGO_URI not set
 */

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mockAuth = require('../config/mock-auth');

const protectDev = (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) return res.status(401).json({ success: false, message: 'Not authorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
    req.user = mockAuth.findUserById(decoded.id);
    if (!req.user) return res.status(401).json({ success: false, message: 'User not found' });
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, company, referralCode } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ success: false, message: 'All fields required' });

    const result = await mockAuth.register(name, email, password, company, referralCode);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: 'Email and password required' });

    const result = await mockAuth.login(email, password);
    res.json(result);
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
});

router.get('/me', protectDev, (req, res) => {
  res.json({ success: true, user: req.user });
});

router.put('/profile', protectDev, async (req, res) => {
  try {
    const { name, company, phone } = req.body;
    const user = mockAuth.updateUser(req.user._id, { name, company, phone });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/password', protectDev, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const result = await mockAuth.changePassword(req.user._id, currentPassword, newPassword);
    res.json(result);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
