import i18next from 'i18next';
import moment, { Moment } from 'moment';

export function getTimeDifferenceFromCurrentTimeHumanized(endTime: Moment) {
  const differenceInMilliseconds = getTimeDifferenceFromCurrentTime(endTime);
  const timeDifferenceHumanized = getTimeHumanized(differenceInMilliseconds);

  return timeDifferenceHumanized;
}

export function getTimeDifferenceFromCurrentTime(time: Moment) {
  return moment().diff(time);
}

export function getTimeHumanized(time: number) {
  const ONE_MINUTE = 60000;

  // manual fix because moment.js is returning one second instead of 'a few seconds'
  return Math.abs(time) >= ONE_MINUTE
    ? moment.duration(time).humanize()
    : i18next.t('aFewSeconds');
}

export function isBeforeCurrentTime(time: Moment) {
  const currentTime = moment();
  return time.isBefore(currentTime);
}
