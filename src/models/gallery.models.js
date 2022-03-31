const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  pictures: [{ type: String, required: true }],
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  }
});

module.exports = mongoose.model('gallery', gallerySchema);