import React, { useEffect, useState } from 'react';
import { GoTriangleUp, GoTriangleDown } from 'react-icons/go';
import { DURATION_LIMITS } from 'constants/Duration';
import { useDuration } from 'hooks/Guilds/useDuration';
import { Modal } from 'old-components/Guilds/common/Modal';
import NumericalInput from 'old-components/Guilds/common/Form/NumericalInput';
import { WarningInput } from './WarningInput';
import {
  MainWrapper,
  Column,
  ColumnButton,
  Container,
  WarningRow,
  StyledButton,
} from './DurationInput.styled';
import { DurationInputProps } from './types';
import Input from 'old-components/Guilds/common/Form/Input';
import { useTranslation } from 'react-i18next';

const DurationInput: React.FC<DurationInputProps> = ({ value, onChange }) => {
  const {
    data: { duration, handleChange, increment, decrement },
  } = useDuration();

  const [isOpen, setIsOpen] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    let SECOND_DURATION = 1;
    let MINUTE_DURATION = SECOND_DURATION * 60;
    let HOUR_DURATION = MINUTE_DURATION * 60;
    let DAY_DURATION = HOUR_DURATION * 24;
    let MONTH_DURATION = DAY_DURATION * 31;
    let YEAR_DURATION = MONTH_DURATION * 12;

    let totalDuration = 0;
    totalDuration += duration.seconds * SECOND_DURATION;
    totalDuration += duration.minutes * MINUTE_DURATION;
    totalDuration += duration.hours * HOUR_DURATION;
    totalDuration += duration.days * DAY_DURATION;
    totalDuration += duration.months * MONTH_DURATION;
    totalDuration += duration.years * YEAR_DURATION;

    onChange(totalDuration);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration]);

  return (
    <>
      <Input value={value} onClick={() => setIsOpen(true)} role="input-modal" />

      <Modal
        isOpen={isOpen}
        onDismiss={() => setIsOpen(false)}
        header={t('selectDuration')}
      >
        <>
          <MainWrapper>
            <Container>
              {Object.keys(duration).map((value, index) => {
                const count = duration[value];

                return (
                  <Column key={index}>
                    <ColumnButton
                      disabled={count >= DURATION_LIMITS[value].max}
                      onClick={() => increment(value)}
                      key={index}
                      data-testid={`upper-limit-btn-${value}`}
                    >
                      <GoTriangleUp />
                    </ColumnButton>

                    <NumericalInput
                      value={count}
                      onChange={e => handleChange(e, value)}
                      textAlign="center"
                      data-testid={value}
                      id={value}
                      muted={count === 0 ? true : false}
                      isInvalid={count > DURATION_LIMITS[value].max}
                    />
                    <ColumnButton
                      disabled={count <= DURATION_LIMITS[value].min}
                      onClick={() => decrement(value)}
                      data-testid={`lower-limit-btn-${value}`}
                    >
                      <GoTriangleDown />
                    </ColumnButton>
                    {t(`duration.${value}`, { count })}
                  </Column>
                );
              })}
            </Container>
            <WarningRow>
              {Object.keys(duration).map(value => {
                return (
                  <WarningInput
                    timeColumn={value}
                    value={duration[value]}
                    limit={DURATION_LIMITS[value]}
                  />
                );
              })}
            </WarningRow>
            <StyledButton onClick={() => setIsOpen(false)}>
              {t('save')}
            </StyledButton>
          </MainWrapper>
        </>
      </Modal>
    </>
  );
};

export default DurationInput;
