const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: String,
    type: {
      type: String,
      enum: ['landbased', 'missionbased', 'both'],
      required: true,
    },
    location: {
      address: String,
      city: String,
      state: String,
      country: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
    mission: String,
    foundingDate: Date,
    website: String,
    contactEmail: String,
    socialLinks: [String],
    members: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        role: { type: String, enum: ['founder', 'admin', 'member', 'guest'], default: 'member' },
        joinedAt: { type: Date, default: Date.now },
      },
    ],
    isActive: { type: Boolean, default: true },
    tags: [String],
    images: [String],
    // Add more fields as needed for your use case
  },
  { timestamps: true },
);

const Community = mongoose.model('Community', communitySchema);

module.exports = Community;
