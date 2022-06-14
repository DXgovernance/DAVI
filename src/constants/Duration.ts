export const DURATION_LIMITS = {
  seconds: {
    min: 0,
    max: 59,
  },
  minutes: {
    min: 0,
    max: 59,
  },
  hours: {
    min: 0,
    max: 23,
  },
  days: {
    min: 0,
    max: 31,
  },
  months: {
    min: 0,
    max: 11,
  },
  years: {
    min: 0,
    max: 10,
  },
};

export const DURATION_IN_SECONDS = {
  second: 1, // 1
  minute: 60, // 60
  hour: 60 * 60, // 3600
  day: 60 * 60 * 24, // 86.400
  month: 60 * 60 * 24 * 31, // 2.678.400
  year: 60 * 60 * 24 * 31 * 12, // 32.140.800
};
