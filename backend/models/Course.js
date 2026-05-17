const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: String, required: true }, // For simplicity, just a name
  duration: { type: String, required: true }, // e.g. "4 Weeks"
  category: { type: String, required: true },
  price: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
