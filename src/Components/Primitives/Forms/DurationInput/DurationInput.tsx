import React, { useState } from 'react';
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
    useDuration(value, onChange);

  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const checkDisabledButton = (duration: string) => {
    if (value < DURATION_IN_SECONDS[duration]) return true;
    else return false;
  };

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
            {Object.keys(durationObject).map((duration, index) => {
              const count = durationObject[duration];

              return (
                <Column key={index}>
                  <ColumnButton
                    onClick={() => increment(duration)}
                    key={index}
                    data-testid={`upper-limit-btn-${duration}`}
                    aria-label={`Increase ${duration}`}
                  >
                    <GoTriangleUp />
                  </ColumnButton>

                  <NumericalInput
                    value={count}
                    onChange={e => handleChange(e, duration)}
                    textAlign="center"
                    data-testid={duration}
                    id={duration}
                    muted={count === 0 ? true : false}
                    aria-label={`Numerical input for ${duration}`}
                  />
                  <ColumnButton
                    onClick={() => decrement(duration)}
                    data-testid={`lower-limit-btn-${duration}`}
                    aria-label={`Decrease ${duration}`}
                    disabled={checkDisabledButton(duration)}
                  >
                    <GoTriangleDown />
                  </ColumnButton>
                  {t(`duration.${duration}`, { count })}
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
