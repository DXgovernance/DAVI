import React from 'react';
import { ActionViewProps } from '..';

const SetGuildConfigInfoLine: React.FC<ActionViewProps> = ({ decodedCall }) => {
  const {
    optionalProps: { updatedFields },
  } = decodedCall;
  const hasUpdatedValues = Object.keys(updatedFields).length;
  return (
    <div>
      setConfig{' | '}
      {hasUpdatedValues &&
        Object.keys(updatedFields).map((key, idx, arr) => (
          <>
            <span>
              {key} {'->'} {updatedFields[key].toString()}
            </span>
            {idx !== arr.length - 1 && <span> / </span>}
          </>
        ))}
    </div>
  );
};

export default SetGuildConfigInfoLine;

