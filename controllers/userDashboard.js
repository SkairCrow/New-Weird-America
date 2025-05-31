exports.getDashboard = (req, res) => {
  // req.user is populated by Passport after authentication
  res.render('account/dashboard', {
    user: req.user,
  });
};
