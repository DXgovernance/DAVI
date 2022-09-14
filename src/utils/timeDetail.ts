import moment from 'moment';

export function getTimeDetail(time: moment.Moment) {
  const ONE_MINUTE = 60000;

  const currentTime = moment();
  let differenceInMilliseconds = currentTime.diff(time);
  let timeDetailHumanize =
    Math.abs(differenceInMilliseconds) >= ONE_MINUTE
      ? moment.duration(differenceInMilliseconds).humanize()
      : 'a few seconds';

  const isBefore = time.isBefore(currentTime);

  return { isBefore, timeDetailHumanize };
}
