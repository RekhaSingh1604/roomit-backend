const express = require("express");

const router = express.Router();

const {
  getRooms,
  getAvailability,
} = require("../controllers/roomController");

// Get all rooms
router.get("/", getRooms);

// Get room availability by date
router.get("/:id/availability", getAvailability);

module.exports = router;