import moment from 'moment';
import { getTimeDifferenceHumanized, isBeforeCurrentTime } from './time';

describe('getTimeDifferenceHumanized', () => {
  it('should return an hour if time is one hour from now ', () => {
    const time = moment().add(1, 'hour');
    const result = getTimeDifferenceHumanized(time);

    expect(result).toBe('an hour');
  });
});

describe('isBeforeCurrentTime', () => {
  it('should return false with a future date', () => {
    const dateAfterCurrent = moment().add(1, 'day');
    const result = isBeforeCurrentTime(dateAfterCurrent);

    expect(result).toBe(false);
  });

  it('should return true with a past date', () => {
    const dateBeforeCurrent = moment().subtract(1, 'day');
    const result = isBeforeCurrentTime(dateBeforeCurrent);

    expect(result).toBe(true);
  });
});
