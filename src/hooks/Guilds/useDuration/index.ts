import { useMemo, useState } from 'react';
import { DURATION_IN_SECONDS } from 'constants/Duration';

export const useDuration = (
  passedValue: number,
  onChange: (value: number) => void
) => {
  const [durationString, setDurationString] = useState('');
  const [durationObject, setDurationObject] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useMemo(() => {
    let durationObjectCopy = { ...durationObject };
    let durationObjectKeys = Object.keys(durationObjectCopy);
    let numberOfSeconds = passedValue;

    durationObjectKeys.reduce((previous, current) => {
      let numberOfUnit = Math.floor(previous / DURATION_IN_SECONDS[current]);
      durationObjectCopy[current] = numberOfUnit;
      previous -= numberOfUnit * DURATION_IN_SECONDS[current];
      return previous;
    }, numberOfSeconds);

    setDurationObject(durationObjectCopy);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passedValue]);

  useMemo(() => {
    let numbersToStringDuration = Object.keys(durationObject).reduce(
      (durationString, timePeriod) => {
        if (durationObject[timePeriod] === 0) return durationString;

        let formattedTimePeriod =
          durationObject[timePeriod] === 1
            ? `${timePeriod.slice(0, -1)}`
            : `${timePeriod}`;

        let separator = durationString.length === 0 ? '' : ', ';

        return (
          durationString +
          `${separator}${durationObject[timePeriod]} ${formattedTimePeriod}`
        );
      },
      ''
    );

    const replaceLastCommaWithAnd = (string: string) => {
      const lastIndex = string.lastIndexOf(',');
      if (lastIndex === -1) return string;

      const replacedString =
        string.substring(0, lastIndex) +
        ' and' +
        string.substring(lastIndex + 1);
      return replacedString;
    };

    numbersToStringDuration = replaceLastCommaWithAnd(numbersToStringDuration);

    setDurationString(numbersToStringDuration);
  }, [durationObject]);

  const increment = (key: string) => {
    let newValue = passedValue;
    newValue += DURATION_IN_SECONDS[key];
    onChange(newValue);
  };

  const decrement = (key: string) => {
    let newValue = passedValue;
    if (newValue >= DURATION_IN_SECONDS[key]) {
      newValue -= DURATION_IN_SECONDS[key];
      onChange(newValue);
    }
  };

  // convert to number form string and then calculate
  const handleChange = (e: string, durationKey: string) => {
    let previousValue =
      durationObject[durationKey] * DURATION_IN_SECONDS[durationKey];

    let currentInputValue: number;
    if (e === '') currentInputValue = 0;
    else currentInputValue = parseInt(e) * DURATION_IN_SECONDS[durationKey];

    let finalValue = passedValue - previousValue + currentInputValue;
    onChange(finalValue);
  };

  let result = {
    durationObject,
    durationString,
    handleChange,
    increment,
    decrement,
  };

  return result;
};
