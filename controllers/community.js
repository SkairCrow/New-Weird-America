const Community = require('../models/Community');

/**
 * Render the create community form
 */
exports.getCreateCommunity = (req, res) => {
  res.render('community/create', { user: req.user });
};

/**
 * Create a new community
 */
exports.createCommunity = async (req, res) => {
  try {
    const community = new Community({
      name: req.body.name,
      description: req.body.description,
      type: req.body.type,
      mission: req.body.mission,
      website: req.body.website,
      contactEmail: req.body.contactEmail,
      members: req.user ? [{ user: req.user._id, role: 'founder' }] : [],
    });
    await community.save();
    res.redirect('/communities');
  } catch (err) {
    res.render('community/create', { user: req.user, error: err.message });
  }
};

/**
 * Get all communities
 */
exports.getCommunities = async (req, res) => {
  try {
    const communities = await Community.find().populate('members.user', 'profile.name email');
    res.render('community/communities', {
      communities,
      user: req.user,
    });
  } catch (err) {
    res.status(500).render('community/communities', {
      communities: [],
      user: req.user,
      error: err.message,
    });
  }
};

/**
 * Get a single community by ID
 */
exports.getCommunityById = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id).populate('members.user', 'profile.name email');
    if (!community) return res.status(404).json({ error: 'Community not found' });
    res.json(community);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Update a community
 */
exports.updateCommunity = async (req, res) => {
  try {
    const community = await Community.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!community) return res.status(404).json({ error: 'Community not found' });
    res.json(community);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * Delete a community
 */
exports.deleteCommunity = async (req, res) => {
  try {
    const community = await Community.findByIdAndDelete(req.params.id);
    if (!community) return res.status(404).json({ error: 'Community not found' });
    res.json({ message: 'Community deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Add a member to a community
 */
exports.addMember = async (req, res) => {
  try {
    const { userId, role } = req.body;
    const community = await Community.findById(req.params.id);
    if (!community) return res.status(404).json({ error: 'Community not found' });

    // Prevent duplicate members
    if (community.members.some((m) => m.user.toString() === userId)) {
      return res.status(400).json({ error: 'User already a member' });
    }

    community.members.push({ user: userId, role });
    await community.save();
    res.json(community);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * Remove a member from a community
 */
exports.removeMember = async (req, res) => {
  try {
    const { userId } = req.body;
    const community = await Community.findById(req.params.id);
    if (!community) return res.status(404).json({ error: 'Community not found' });

    community.members = community.members.filter((m) => m.user.toString() !== userId);
    await community.save();
    res.json(community);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
