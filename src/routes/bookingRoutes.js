// const express = require("express");

// const router = express.Router();

// const {
//   createBooking,
//   getBookingsByEmail,
//   cancelBooking,
// } = require("../controllers/bookingController");


// router.patch("/:id/cancel", cancelBooking);

// // Create Booking
// router.post("/", createBooking);

// // Get User Bookings
// router.get("/", getBookingsByEmail);

// // Cancel Booking
// router.patch("/:id/cancel", cancelBooking);

// module.exports = router;

const express = require("express");

const router = express.Router();

const {
  createBooking,
  getBookingsByEmail,
  cancelBooking,
  rescheduleBooking,
} = require("../controllers/bookingController");

router.post("/", createBooking);

router.get("/", getBookingsByEmail);

router.patch("/:id/cancel", cancelBooking);

router.patch(
  "/:id/reschedule",
  rescheduleBooking
);

module.exports = router;