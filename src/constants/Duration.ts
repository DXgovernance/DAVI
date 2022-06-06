export const DURATION_LIMITS = {
  years: {
    min: 0,
    max: 10,
  },
  months: {
    min: 0,
    max: 11,
  },
  days: {
    min: 0,
    max: 31,
  },
  hours: {
    min: 0,
    max: 23,
  },
  minutes: {
    min: 0,
    max: 59,
  },
  seconds: {
    min: 0,
    max: 59,
  },
};

export const DURATION_IN_SECONDS = {
  second: 1,
  minute: 60,
  hour: 60 * 60,
  day: 60 * 60 * 24,
  month: 60 * 60 * 24 * 31,
  year: 60 * 60 * 24 * 31 * 12,
};
