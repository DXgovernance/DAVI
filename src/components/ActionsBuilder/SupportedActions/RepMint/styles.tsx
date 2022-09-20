import styled from 'styled-components';
import { NumericalInput } from 'components/primitives/Forms/NumericalInput';
import { StyledIcon } from 'components/primitives/StyledIcon';
import { ErrorLabel } from 'components/primitives/Forms/ErrorLabel';

export const StyledMintIcon = styled(StyledIcon)`
  margin: 0;
`;

export const RepMintInput = styled(NumericalInput)`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const Error = styled(ErrorLabel)`
  margin-top: 0.5rem;
`;
