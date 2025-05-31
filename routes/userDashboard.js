const express = require('express');
const router = express.Router();
const passportConfig = require('../config/passport');
const userDashboardController = require('../controllers/userDashboard');

router.get('/', passportConfig.isAuthenticated, userDashboardController.getDashboard);

module.exports = router;
