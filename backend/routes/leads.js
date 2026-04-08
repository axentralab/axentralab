const express = require('express');
const router = express.Router();
const aiLeadController = require('../controllers/aiLeadController');
const { protect, adminOnly } = require('../middleware/auth');

/**
 * Public Routes
 */
router.post('/', aiLeadController.createLead);  // Create lead (auto-scored)

/**
 * Admin Routes - Static routes MUST come before dynamic routes
 */

// Reports & Analytics - BEFORE :id routes to avoid conflicts
router.get('/admin/high-priority', protect, adminOnly, aiLeadController.getHighPriorityLeads);
router.get('/admin/followup-candidates', protect, adminOnly, aiLeadController.getFollowupCandidates);
router.get('/admin/analytics', protect, adminOnly, aiLeadController.getLeadAnalytics);

// Get all leads
router.get('/', protect, adminOnly, aiLeadController.getLeads);

// Dynamic routes - AFTER static routes
router.get('/:id', protect, adminOnly, aiLeadController.getLead);
router.put('/:id', protect, adminOnly, aiLeadController.updateLead);
router.delete('/:id', protect, adminOnly, aiLeadController.deleteLead);

// AI Features
router.post('/:id/auto-proposal', protect, adminOnly, aiLeadController.autoGenerateProposal);
router.post('/:id/send-proposal', protect, adminOnly, aiLeadController.sendProposalEmail);
router.post('/:id/send-followup', protect, adminOnly, aiLeadController.sendFollowup);

module.exports = router;
