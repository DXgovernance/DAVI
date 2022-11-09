import { useMemo, useState } from 'react';
import { DURATION_IN_SECONDS } from 'constants/Duration';
import { getDurationData, DEFAULT_DURATION_OBJECT } from './getDurationData';

export const useDuration = (
  value: number,
  onChange: (value: number) => void
) => {
  const [durationString, setDurationString] = useState('');
  const [durationObject, setDurationObject] = useState(DEFAULT_DURATION_OBJECT);

  useMemo(() => {
    const data = getDurationData(value);
    setDurationString(data.string);
    setDurationObject(data.object);
  }, [value]);

  const increment = (durationKey: string) => {
    if (typeof value === 'string' && value === '') value = 0;
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
