const Community = require('../models/Community');

exports.getDashboard = async (req, res) => {
  try {
    // Find communities where the user is a member
    const communities = await Community.find({ 'members.user': req.user._id }).lean();

    // For each community, find the user's role
    const affiliations = communities.map((comm) => {
      const member = comm.members.find((m) => m.user.toString() === req.user._id.toString());
      return {
        _id: comm._id,
        name: comm.name,
        role: member ? member.role : 'member',
      };
    });

    res.render('account/dashboard', {
      user: req.user,
      affiliations,
    });
  } catch (err) {
    console.error(err);
    res.render('account/dashboard', {
      user: req.user,
      affiliations: [],
      error: 'Could not load community affiliations.',
    });
  }
};
