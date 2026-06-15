const Room = require("../models/Room");
const { addMinutes } = require("../utils/timeUtils");

const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const BookingSlot = require("../models/BookingSlot");

const generateSlots = require("../utils/slotGenerator");
const refundCalculator = require("../utils/refundCalculator");

const createBooking = async (req, res) => {
  const session =
    await mongoose.startSession();

  session.startTransaction();

  try {
    const {
      roomId,
      date,
      startTime,
      endTime,
      title,
      name,
      email,
    } = req.body;

    // const slots = generateSlots(
    //   startTime,
    //   endTime
    // );


    const room = await Room.findById(roomId);

const bufferedEndTime = addMinutes(
  endTime,
  room.bufferMinutes
);

const slots = generateSlots(
  startTime,
  bufferedEndTime
);


  if (startTime >= endTime) {
  return res.status(400).json({
    success: false,
    message: "End time must be greater than start time",
  });
}

    const booking = await Booking.create(
      [
        {
          room: roomId,
          date,
          startTime,
          endTime,
          title,
          bookedBy: {
            name,
            email,
          },
        },
      ],
      { session }
    );


  


    const slotDocs = slots.map((slot) => ({
      roomId,
      date,
      slotStart: slot,
      bookingId: booking[0]._id,
    }));

    await BookingSlot.insertMany(
      slotDocs,
      {
        session,
      }
    );

    await session.commitTransaction();

    res.status(201).json({
      success: true,
      booking: booking[0],
    });
  } catch (error) {
    await session.abortTransaction();

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "Slot already booked",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    session.endSession();
  }
};

const getBookingsByEmail = async (req, res) => {
  try {

    const email = req.query.email;

    const bookings = await Booking.find({
      "bookedBy.email": email,
    }).populate("room");

    res.status(200).json({
      success: true,
      data: bookings,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(
      req.params.id
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (
      booking.status !== "confirmed"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Booking already cancelled",
      });
    }

    const refundable =
      refundCalculator(
        booking.date,
        booking.startTime
      );

    booking.status = refundable
      ? "cancelled-refundable"
      : "cancelled-non-refundable";

    await booking.save();

    await BookingSlot.deleteMany({
      bookingId: booking._id,
    });

    res.status(200).json({
      success: true,
      booking,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


const rescheduleBooking = async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    const bookingId = req.params.id;

    const {
      date,
      startTime,
      endTime,
    } = req.body;

    const booking =
      await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (
      booking.status !== "confirmed"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Cancelled booking cannot be rescheduled",
      });
    }

    if (startTime >= endTime) {
      return res.status(400).json({
        success: false,
        message:
          "End time must be greater than start time",
      });
    }

    await BookingSlot.deleteMany(
      {
        bookingId: booking._id,
      },
      { session }
    );

    const slots = generateSlots(
      startTime,
      endTime
    );

    const slotDocs = slots.map(
      (slot) => ({
        roomId: booking.room,
        date,
        slotStart: slot,
        bookingId: booking._id,
      })
    );

    await BookingSlot.insertMany(
      slotDocs,
      { session }
    );

    booking.date = date;
    booking.startTime =
      startTime;
    booking.endTime = endTime;

    await booking.save({
      session,
    });

    await session.commitTransaction();

    res.status(200).json({
      success: true,
      booking,
    });

  } catch (error) {

    await session.abortTransaction();

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "Requested slot already booked",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });

  } finally {

    session.endSession();

  }
};


module.exports = {
  createBooking,
  getBookingsByEmail,
  cancelBooking,
  rescheduleBooking,};