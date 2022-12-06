import React from 'react';
import { BigNumber } from 'ethers';
import { AiFillSetting } from 'react-icons/ai';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { ActionViewProps } from '..';
import { useUpdatedGuildConfigValues } from './useUpdatedGuildConfigValues';
import { FIELDS } from './constants';
import { bn } from 'utils/safeBn';
import { useTranslation } from 'react-i18next';
import { FieldType } from './types';
import {
  InfoLineWrapper,
  InfoLineTitle,
  InfoLineConfigItem,
} from './SetGuildConfigEditor.styled';
import { Flex } from 'components/primitives/Layout/Flex';
import { getDurationData } from 'hooks/Guilds/useDuration/getDurationData';

const getDisplayValue = (value: BigNumber, type: FieldType) => {
  if (type === FieldType.number) return bn(value).toNumber();
  if (type === FieldType.percentage) return `${bn(value).div(100).toNumber()}%`;
  if (type === FieldType.duration)
    return getDurationData(bn(value).toNumber()).string;
  return bn(value).toNumber();
};

const SetGuildConfigInfoLine: React.FC<ActionViewProps> = ({
  decodedCall,
  compact,
}) => {
  const { t } = useTranslation();
  const { args } = decodedCall;
  const updatedValues = useUpdatedGuildConfigValues(args);
  return (
    <InfoLineWrapper>
      <Flex direction="row" justifyContent="flex-start">
        <AiFillSetting size={16} />
        <InfoLineTitle>{t('setGuildConfig')}</InfoLineTitle>
      </Flex>
      {!compact && (
        <>
          {Object.keys(updatedValues ?? {})?.map(key => {
            const field = FIELDS.find(f => f.name === key);
            const type = field?.type;

            const current = getDisplayValue(
              updatedValues[key].currentValue,
              type
            );
            const newValue = getDisplayValue(updatedValues[key].newValue, type);

            return (
              <InfoLineConfigItem key={key}>
                <>
                  {field.label}: {current} <IoIosArrowRoundForward size={24} />{' '}
                  {newValue}
                </>
              </InfoLineConfigItem>
            );
          })}
        </>
      )}
    </InfoLineWrapper>
  );
};

export default SetGuildConfigInfoLine;
