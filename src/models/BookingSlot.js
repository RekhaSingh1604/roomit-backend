const mongoose = require("mongoose");

const bookingSlotSchema = new mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },

  date: {
    type: String,
    required: true,
  },

  slotStart: {
    type: String,
    required: true,
  },

  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
  },
});

bookingSlotSchema.index(
  {
    roomId: 1,
    date: 1,
    slotStart: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model(
  "BookingSlot",
  bookingSlotSchema
);