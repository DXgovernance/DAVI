import { GoTriangleUp, GoTriangleDown } from 'react-icons/go';
import React, { useState } from 'react';
import { DURATION_LIMITS } from 'constants/Duration';
import { useDuration } from 'hooks/Guilds/useDuration';
import { Modal } from 'old-components/Guilds/common/Modal';
import NumericalInput from 'old-components/Guilds/common/Form/NumericalInput';
import { WarningInput } from './WarningInput';
import {
  Column,
  ColumnButton,
  Container,
  WarningRow,
} from './DurationInput.styled';
import { DurationInputProps } from './types';
import Input from 'old-components/Guilds/common/Form/Input';

const DurationInput: React.FC<DurationInputProps> = ({ value = 1 }) => {
  const {
    data: { duration, handleChange, increment, decrement },
  } = useDuration();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Input value={10} onClick={() => setIsOpen(true)} />

      <Modal isOpen={isOpen} onDismiss={() => setIsOpen(false)}>
        <>
          <Container>
            {Object.keys(duration).map((value, index) => {
              const count = duration[value];

              return (
                <Column>
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
                  {count === 1 ? `${value.slice(0, -1)}` : value}
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
        </>
      </Modal>
    </>
  );
};

export default DurationInput;
