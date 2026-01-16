const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  slotId: {
    type: String,
    required: true,
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

// 🔐 Blokada tylko dla tego samego slotu w tym samym dniu
bookingSchema.index({ slotId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Booking", bookingSchema);
