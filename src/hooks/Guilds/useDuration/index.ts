import { useMemo, useState } from 'react';
import { DURATION_IN_SECONDS } from 'constants/Duration';

export const useDuration = (
  value: number,
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
    let numberOfSeconds = value;

    durationObjectKeys.reduce((remainingSeconds, durationKey) => {
      let count = Math.floor(
        remainingSeconds / DURATION_IN_SECONDS[durationKey]
      );
      durationObjectCopy[durationKey] = count;
      remainingSeconds -= count * DURATION_IN_SECONDS[durationKey];
      return remainingSeconds;
    }, numberOfSeconds);

    setDurationObject(durationObjectCopy);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useMemo(() => {
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

  const increment = (durationKey: string) => {
    let newValue = value;
    newValue += DURATION_IN_SECONDS[durationKey];
    onChange(newValue);
  };

  const decrement = (durationKey: string) => {
    let newValue = value;
    if (newValue >= DURATION_IN_SECONDS[durationKey]) {
      newValue -= DURATION_IN_SECONDS[durationKey];
      onChange(newValue);
    }
  };

  const handleInputChange = (e: string, durationKey: string) => {
    let previousInputValue =
      durationObject[durationKey] * DURATION_IN_SECONDS[durationKey];

    let currentInputValue: number;
    if (e === '') currentInputValue = 0;
    else currentInputValue = parseInt(e) * DURATION_IN_SECONDS[durationKey];

    let finalValue = value - previousInputValue + currentInputValue;
    onChange(finalValue);
  };

  let result = {
    durationObject,
    durationString,
    handleInputChange,
    increment,
    decrement,
  };

  return result;
};
