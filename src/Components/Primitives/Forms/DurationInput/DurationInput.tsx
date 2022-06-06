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
import { DURATION_IN_SECONDS } from 'constants/Duration';

const DurationInput: React.FC<DurationInputProps> = ({ value, onChange }) => {
  const {
    data: { duration, handleChange, increment, decrement },
  } = useDuration();

  const [isOpen, setIsOpen] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    let totalDuration = 0;
    totalDuration += duration.seconds * DURATION_IN_SECONDS.second;
    totalDuration += duration.minutes * DURATION_IN_SECONDS.minute;
    totalDuration += duration.hours * DURATION_IN_SECONDS.hour;
    totalDuration += duration.days * DURATION_IN_SECONDS.day;
    totalDuration += duration.months * DURATION_IN_SECONDS.month;
    totalDuration += duration.years * DURATION_IN_SECONDS.year;

    onChange(totalDuration);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration]);

  return (
    <>
      <Input
        value={value}
        onChange={onChange}
        onClick={() => setIsOpen(true)}
        role="input-modal"
      />

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
                      aria-label={`Increase ${value}`}
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
                      aria-label={`Numerical input for ${value}`}
                    />
                    <ColumnButton
                      disabled={count <= DURATION_LIMITS[value].min}
                      onClick={() => decrement(value)}
                      data-testid={`lower-limit-btn-${value}`}
                      aria-label={`Decrease ${value}`}
                    >
                      <GoTriangleDown />
                    </ColumnButton>
                    {t(`duration.${value}`, { count })}
                  </Column>
                );
              })}
            </Container>
            <WarningRow>
              {Object.keys(duration).map((value, index) => {
                return (
                  <WarningInput
                    timeColumn={value}
                    value={duration[value]}
                    limit={DURATION_LIMITS[value]}
                    key={index}
                  />
                );
              })}
            </WarningRow>
            <StyledButton onClick={() => setIsOpen(false)} aria-label="Save">
              {t('save')}
            </StyledButton>
          </MainWrapper>
        </>
      </Modal>
    </>
  );
};

export default DurationInput;
