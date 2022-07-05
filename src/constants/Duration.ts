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
  seconds: 1, // 1
  minutes: 60, // 60
  hours: 60 * 60, // 3600
  days: 60 * 60 * 24, // 86.400
  months: 60 * 60 * 24 * 30, // 2.592.000
  years: 60 * 60 * 24 * 30 * 12, // 31.104.000
};
