import moment from 'moment';

export function getTimeDetail(endTime: moment.Moment) {
  const ONE_MINUTE = 60000;

  const currentTime = moment();
  let differenceInMilliseconds = currentTime.diff(endTime);
  // manual fix because moment.js is returning one second instead of 'a few seconds'
  let timeDetailHumanized =
    Math.abs(differenceInMilliseconds) >= ONE_MINUTE
      ? moment.duration(differenceInMilliseconds).humanize()
      : 'a few seconds';

  const isBefore = endTime.isBefore(currentTime);

  return { isBefore, timeDetailHumanized };
}
