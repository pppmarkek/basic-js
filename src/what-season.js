function getSeason(date) {
  if (arguments.length === 0) return 'Unable to determine the time of year!';
  if (
    !(date instanceof Date) ||
    Object.getOwnPropertyNames(date).length > 0 ||
    Object.getOwnPropertySymbols(date).length > 0 ||
    Object.getPrototypeOf(date) !== Date.prototype
  ) {
    throw new Error('Invalid date!');
  }

  let time;
  try {
    time = date.valueOf();
  } catch (e) {
    throw new Error('Invalid date!');
  }

  if (isNaN(time)) {
    throw new Error('Invalid date!');
  }

  const month = date.getMonth();

  if (month === 11 || month === 0 || month === 1) {
    return 'winter';
  } else if (month >= 2 && month <= 4) {
    return 'spring';
  } else if (month >= 5 && month <= 7) {
    return 'summer';
  } else {
    return 'autumn';
  }
}

module.exports = {
  getSeason
};
