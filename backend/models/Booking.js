const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  slotId: {
    type: String,
    required: true,
    unique: true, // 🔐 HARD BLOCK – DB LEVEL
    index: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  date: { type: String, required: true },
  time: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// 🔐 extra safety (Mongo)
bookingSchema.index({ slotId: 1 }, { unique: true });

module.exports = mongoose.model("Booking", bookingSchema);
