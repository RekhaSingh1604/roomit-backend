const express = require("express");
const Room = require("../models/Room");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    await Room.deleteMany({});

    await Room.insertMany([
      {
        name: "Conference Room A",
        location: "First Floor",
        capacity: 10,
      },
      {
        name: "Conference Room B",
        location: "Second Floor",
        capacity: 15,
      },
      {
        name: "Meeting Room C",
        location: "Third Floor",
        capacity: 8,
      },
      {
        name: "Board Room",
        location: "Executive Floor",
        capacity: 20,
      },
    ]);

    res.json({
      success: true,
      message: "Rooms Seeded Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;