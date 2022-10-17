import React from 'react';
import { BigNumber } from 'ethers';
import { ActionViewProps } from '..';
import { duration } from 'moment';
import { useUpdatedGuildConfigValues } from './useUpdatedGuildConfigValues';
import { FIELDS } from './constants';

const SetGuildConfigInfoLine: React.FC<ActionViewProps> = ({ decodedCall }) => {
  const { args } = decodedCall;

  const updatedValues = useUpdatedGuildConfigValues(args);
  return (
    <div>
      Set Guild Config{' -> '}
      {Object.keys(updatedValues ?? {})?.map((key, idx, arr) => {
        const field = FIELDS.find(f => f.name === key);
        const type = field?.type;
        const value =
          type === 'number'
            ? BigNumber.from(updatedValues[key] ?? 0).toNumber()
            : duration(
                BigNumber.from(updatedValues[key] ?? 0).toNumber(),
                'seconds'
              ).humanize();
        return (
          <div key={key}>
            <span>
              {key} {'='} {value}
            </span>
            {idx !== arr.length - 1 && <span> / </span>}
          </div>
        );
      })}
    </div>
  );
};

export default SetGuildConfigInfoLine;
