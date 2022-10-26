import React from 'react';
import { ActionViewProps } from '..';
import { duration } from 'moment';
import { useUpdatedGuildConfigValues } from './useUpdatedGuildConfigValues';
import { FIELDS } from './constants';
import { bn } from './utils';
import { useTranslation } from 'react-i18next';

const getDisplayValue = (value, type) => {
  return type === 'number'
    ? bn(value).toNumber()
    : duration(bn(value).toNumber(), 'seconds').humanize();
};

const SetGuildConfigInfoLine: React.FC<ActionViewProps> = ({
  decodedCall,
  compact,
}) => {
  const { t } = useTranslation();
  const { args } = decodedCall;
  const updatedValues = useUpdatedGuildConfigValues(args);
  return (
    <div>
      {t('setGuildConfig')}
      {!compact && (
        <>
          {' :: '}
          {Object.keys(updatedValues ?? {})?.map((key, idx, arr) => {
            const field = FIELDS.find(f => f.name === key);
            const type = field?.type;
            const current = getDisplayValue(
              updatedValues[key].currentValue,
              type
            );
            const newValue = getDisplayValue(updatedValues[key].newValue, type);

            return (
              <div key={key}>
                <span>
                  {key}: {current} {' -> '} {newValue}
                </span>
                {idx !== arr.length - 1 && <span> / </span>}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default SetGuildConfigInfoLine;
