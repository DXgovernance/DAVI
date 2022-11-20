import { DURATION_IN_SECONDS } from 'constants/Duration';

type DurationObject = {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};
export const DEFAULT_DURATION_OBJECT: DurationObject = {
  years: 0,
  months: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

const replaceLastCommaWithAnd = (string: string) => {
  const lastIndex = string.lastIndexOf(',');
  if (lastIndex === -1) return string;

  const replacedString =
    string.substring(0, lastIndex) + ' and' + string.substring(lastIndex + 1);
  return replacedString;
};

interface getDurationDataReturn {
  object: DurationObject;
  string: string;
}

export const getDurationData = (value: number): getDurationDataReturn => {
  let durationString = '';
  let durationObject = DEFAULT_DURATION_OBJECT;

  let durationObjectCopy = { ...durationObject };
  let durationObjectKeys = Object.keys(durationObjectCopy);
  let numberOfSeconds = value;

  durationObjectKeys.reduce((remainingSeconds, durationKey) => {
    let count = Math.floor(remainingSeconds / DURATION_IN_SECONDS[durationKey]);
    durationObjectCopy[durationKey] = count;
    remainingSeconds -= count * DURATION_IN_SECONDS[durationKey];
    return remainingSeconds;
  }, numberOfSeconds);

  durationObject = durationObjectCopy;

  let numbersToStringDuration = Object.keys(durationObject).reduce(
    (durationString, durationKey) => {
      if (durationObject[durationKey] === 0) return durationString;

      let formattedDurationKey =
        durationObject[durationKey] === 1
          ? `${durationKey.slice(0, -1)}`
          : `${durationKey}`;

      let separator = durationString.length === 0 ? '' : ', ';

      return (
        durationString +
        `${separator}${durationObject[durationKey]} ${formattedDurationKey}`
      );
    },
    ''
  );

  durationString = replaceLastCommaWithAnd(numbersToStringDuration);

  return { object: durationObject, string: durationString };
};
