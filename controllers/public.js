const User = require('../models/User');

// Function to get all user profiles
exports.getUserProfiles = async (req, res, next) => {
  try {
    // Only select public profile fields
    const users = await User.find(
      {},
      {
        email: 1,
        profile: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    ).lean();

    res.render('public/user-profiles', {
      title: 'User Profiles',
      users,
    });
  } catch (err) {
    next(err);
  }
};

// Function to get a specific user profile by ID
exports.getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).lean();
    if (!user) {
      return res.status(404).render('404', { title: 'User Not Found' });
    }
    res.render('public/user-profile', {
      title: user.profile && user.profile.name ? user.profile.name : 'User Profile',
      user,
    });
  } catch (err) {
    next(err);
  }
};
