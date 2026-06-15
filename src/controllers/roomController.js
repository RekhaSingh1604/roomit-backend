// const Room = require("../models/Room");
const Room = require("../models/Room");
const BookingSlot = require("../models/BookingSlot");
const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();

    res.status(200).json({
      success: true,
      data: rooms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getAvailability = async (req, res) => {
  try {
    const roomId = req.params.id;
    const date = req.query.date;

    const bookedSlots = await BookingSlot.find({
      roomId,
      date,
    });

    const allSlots = [];

    for (let hour = 9; hour < 18; hour++) {
      allSlots.push(
        `${String(hour).padStart(2, "0")}:00`
      );

      allSlots.push(
        `${String(hour).padStart(2, "0")}:30`
      );
    }

    // const booked = bookedSlots.map(
    //   (slot) => slot.slotStart
    // );

    const booked = bookedSlots.map((slot) => ({
  time: slot.slotStart,
  bookingId: slot.bookingId,
}));

    // const available = allSlots.filter(
    //   (slot) => !booked.includes(slot)
    // );

    const bookedTimes = booked.map(
  (b) => b.time
);

const available = allSlots.filter(
  (slot) => !bookedTimes.includes(slot)
);

    // res.json({
    //   available,
    //   booked,
    // });


    res.json({
  available,
  booked: bookedTimes,
});

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
module.exports = {
  getRooms,
  getAvailability,
};