import React, { useEffect, useState } from 'react';
import { GoTriangleUp, GoTriangleDown } from 'react-icons/go';
import { useDuration } from 'hooks/Guilds/useDuration';
import { Modal } from 'Components';
import NumericalInput from 'old-components/Guilds/common/Form/NumericalInput';
import {
  MainWrapper,
  Column,
  ColumnButton,
  Container,
  StyledButton,
  TransparentButton,
} from './DurationInput.styled';
import { DurationInputProps } from './types';
import { useTranslation } from 'react-i18next';
import { DURATION_IN_SECONDS } from 'constants/Duration';

const DurationInput: React.FC<DurationInputProps> = ({ value, onChange }) => {
  const { durationObject, durationString, handleChange, increment, decrement } =
    useDuration(value);

  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    let totalDuration = 0;
    totalDuration += durationObject.seconds * DURATION_IN_SECONDS.seconds;
    totalDuration += durationObject.minutes * DURATION_IN_SECONDS.minutes;
    totalDuration += durationObject.hours * DURATION_IN_SECONDS.hours;
    totalDuration += durationObject.days * DURATION_IN_SECONDS.days;
    totalDuration += durationObject.months * DURATION_IN_SECONDS.months;
    totalDuration += durationObject.years * DURATION_IN_SECONDS.years;

    onChange(totalDuration);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [durationObject]);

  return (
    <>
      <TransparentButton
        variant="secondary"
        onClick={() => setIsOpen(true)}
        aria-label="Duration picker button"
        type="button"
      >
        {!durationString.length ? '' : durationString}
      </TransparentButton>
      <Modal
        isOpen={isOpen}
        onDismiss={() => setIsOpen(false)}
        header={t('selectDuration')}
      >
        <MainWrapper>
          <Container>
            {Object.keys(durationObject).map((value, index) => {
              const count = durationObject[value];

              return (
                <Column key={index}>
                  <ColumnButton
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
                    aria-label={`Numerical input for ${value}`}
                  />
                  <ColumnButton
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
          <StyledButton onClick={() => setIsOpen(false)} aria-label="Save">
            {t('save')}
          </StyledButton>
        </MainWrapper>
      </Modal>
    </>
  );
};

export default DurationInput;
