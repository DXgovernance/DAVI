import i18next from 'i18next';
import moment from 'moment';

export function getTimeDifferenceFromCurrentTimeHumanized(
  endTime: moment.Moment
) {
  const ONE_MINUTE = 60000;

  const currentTime = moment();
  const differenceInMilliseconds = currentTime.diff(endTime);
  // manual fix because moment.js is returning one second instead of 'a few seconds'
  const timeDifferenceHumanized =
    Math.abs(differenceInMilliseconds) >= ONE_MINUTE
      ? moment.duration(differenceInMilliseconds).humanize()
      : i18next.t('aFewSeconds');

  return timeDifferenceHumanized;
}

export function isBeforeCurrentTime(time: moment.Moment) {
  const currentTime = moment();
  return time.isBefore(currentTime);
}
