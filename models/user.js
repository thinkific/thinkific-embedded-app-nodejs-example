const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    accessToken: {
      type: String,
      required: true,
    },
    gid: {
      type: String,
      required: true,
    },
    subdomain: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('user', userSchema);
