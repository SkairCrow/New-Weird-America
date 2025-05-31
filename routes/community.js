const express = require('express');
const router = express.Router();
const passportConfig = require('../config/passport');
const communityController = require('../controllers/community');

// Render the create community form (authenticated users only)
router.get('/create', passportConfig.isAuthenticated, communityController.getCreateCommunity);

// Handle form submission (authenticated users only)
router.post('/create', passportConfig.isAuthenticated, communityController.createCommunity);

// Get all communities
router.get('/', communityController.getCommunities);

// Get a single community by ID
router.get('/:id', communityController.getCommunityById);

// Update a community
router.put('/:id', passportConfig.isAuthenticated, communityController.updateCommunity);

// Delete a community
router.delete('/:id', passportConfig.isAuthenticated, communityController.deleteCommunity);

// Add a member to a community
router.post('/:id/members', passportConfig.isAuthenticated, communityController.addMember);

// Remove a member from a community
router.delete('/:id/members', passportConfig.isAuthenticated, communityController.removeMember);

module.exports = router;
