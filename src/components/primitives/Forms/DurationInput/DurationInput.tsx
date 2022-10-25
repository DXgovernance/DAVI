import React, { useState } from 'react';
import { GoTriangleUp, GoTriangleDown } from 'react-icons/go';
import { useDuration } from 'hooks/Guilds/useDuration';
import { Modal } from 'components/primitives/Modal';
import { NumericalInput } from 'components/primitives/Forms/NumericalInput';
import {
  MainWrapper,
  Column,
  Container,
  ColumnButton,
  StyledButton,
  TransparentButton,
} from './DurationInput.styled';
import { DurationInputProps } from './types';
import { useTranslation } from 'react-i18next';
import { DURATION_IN_SECONDS } from 'constants/Duration';

const DurationInput: React.FC<DurationInputProps> = ({ value, onChange }) => {
  const {
    durationObject,
    durationString,
    handleInputChange,
    increment,
    decrement,
  } = useDuration(value, onChange);

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
            {Object.keys(durationObject).map((durationKey, index) => {
              const count = durationObject[durationKey];

              return (
                <Column key={index}>
                  <ColumnButton
                    onClick={() => increment(durationKey)}
                    key={index}
                    data-testid={`upper-limit-btn-${durationKey}`}
                    aria-label={`Increase ${durationKey}`}
                  >
                    <GoTriangleUp />
                  </ColumnButton>

                  <NumericalInput
                    value={count}
                    onChange={e => handleInputChange(e, durationKey)}
                    textAlign="center"
                    data-testid={durationKey}
                    id={durationKey}
                    muted={count === 0 ? true : false}
                    ariaLabel={`Numerical input for ${durationKey}`}
                  />
                  <ColumnButton
                    onClick={() => decrement(durationKey)}
                    data-testid={`lower-limit-btn-${durationKey}`}
                    aria-label={`Decrease ${durationKey}`}
                    disabled={checkDisabledButton(durationKey)}
                  >
                    <GoTriangleDown />
                  </ColumnButton>
                  {t(`duration.${durationKey}`, { count })}
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
