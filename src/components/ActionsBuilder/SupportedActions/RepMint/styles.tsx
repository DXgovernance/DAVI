import styled from 'styled-components';
import { NumericalInput } from 'components/primitives/Forms/NumericalInput';
import { StyledIcon } from 'components/primitives/StyledIcon';
import { Box } from 'components/primitives/Layout/Box';
import { ErrorLabel } from 'components/primitives/Forms/ErrorLabel';

export const StyledMintIcon = styled(StyledIcon)`
  margin: 0;
`;

export const Control = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: 0.75rem 0;
  width: 100%;
`;

export const ControlLabel = styled(Box)`
  display: flex;
  flex-direction: row;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.colors.grey};
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
`;

export const ControlRow = styled(Box)`
  display: flex;
  align-items: stretch;
  height: 100%;
`;

export const RepMintInput = styled(NumericalInput)`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const Error = styled(ErrorLabel)`
  margin-top: 0.5rem;
`;
