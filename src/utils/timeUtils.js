const addMinutes = (time, minutes) => {
  let [hours, mins] = time.split(":").map(Number);

  let total = hours * 60 + mins + minutes;

  let h = Math.floor(total / 60);
  let m = total % 60;

  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};

module.exports = {
  addMinutes,
};