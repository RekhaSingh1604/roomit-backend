const generateSlots = (startTime, endTime) => {
  const slots = [];

  let [startHour, startMin] = startTime
    .split(":")
    .map(Number);

  let [endHour, endMin] = endTime
    .split(":")
    .map(Number);

  let current = startHour * 60 + startMin;
  let end = endHour * 60 + endMin;

  while (current < end) {
    const h = Math.floor(current / 60);
    const m = current % 60;

    slots.push(
      `${String(h).padStart(2, "0")}:${String(
        m
      ).padStart(2, "0")}`
    );

    current += 30;
  }

  return slots;
};

module.exports = generateSlots;