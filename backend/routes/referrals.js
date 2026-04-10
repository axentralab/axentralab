const express = require('express');
const router = express.Router();
const referralController = require('../controllers/referralController');
const { protect } = require('../middleware/auth');

// User routes
router.get('/code', protect, referralController.getOrCreateReferralCode);
router.get('/stats', protect, referralController.getReferralStats);
router.get('/history', protect, referralController.getReferralHistory);
router.post('/verify', referralController.registerWithReferral);

// Admin routes
router.get('/all', protect, referralController.getAllReferrals);
router.post('/complete', protect, referralController.completeReferral);

module.exports = router;
