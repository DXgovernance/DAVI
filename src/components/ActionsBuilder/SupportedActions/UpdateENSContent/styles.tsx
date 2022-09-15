import styled from 'styled-components';
import { StyledIcon } from 'components/primitives/StyledIcon';
import { DetailBody } from '../common/Summary.styled';
import { ErrorLabel } from 'components/primitives/Forms/ErrorLabel';

export const StyledENSIcon = styled(StyledIcon)`
  margin: 0;
  height: 1.4rem;
`;

export const DiffContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border1};
  border-radius: 2px;
`;

export const DiffDetail = styled(DetailBody)`
  padding: 0.75rem 1rem;
  margin: 0;
`;

export const DiffStat = styled.span<{ removed?: boolean }>`
  margin: 0 0.2rem;
  color: ${({ removed, theme }) =>
    removed ? theme.colors.syntax.removeStat : theme.colors.syntax.addStat};
`;

export const Error = styled(ErrorLabel)`
  margin-top: 0.5rem;
`;
