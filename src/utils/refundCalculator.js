const refundCalculator = (bookingDate, startTime) => {
  const bookingStart = new Date(
    `${bookingDate}T${startTime}:00`
  );

  const currentTime = new Date();

  const diffHours =
    (bookingStart - currentTime) /
    (1000 * 60 * 60);

  return diffHours >= 2;
};

module.exports = refundCalculator;