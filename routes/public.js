const express = require('express');
const router = express.Router();
const publicController = require('../controllers/public');

// Route to get all user profiles
router.get('/user-profiles', publicController.getUserProfiles);

// Route to get a specific user profile by ID
router.get('/user-profile/:id', publicController.getUserProfile);

module.exports = router;
