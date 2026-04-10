const express = require('express');
const router = express.Router();
const referralController = require('../controllers/referralController');
const auth = require('../middleware/auth');

// User routes
router.get('/code', auth, referralController.getOrCreateReferralCode);
router.get('/stats', auth, referralController.getReferralStats);
router.get('/history', auth, referralController.getReferralHistory);
router.post('/verify', referralController.registerWithReferral);

// Admin routes
router.get('/all', auth, referralController.getAllReferrals);
router.post('/complete', auth, referralController.completeReferral);

module.exports = router;
