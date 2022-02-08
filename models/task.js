const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('task', taskSchema);
