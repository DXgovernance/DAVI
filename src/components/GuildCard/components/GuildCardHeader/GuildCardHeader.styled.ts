import styled from 'styled-components';
import { Flex, Box } from 'components/primitives/Layout';

export const Header = styled(Flex)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.text};
`;
export const MemberWrapper = styled(Flex)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.grey};
`;
export const MemberNumberWrapper = styled.div`
  padding-left: 7px;
`;

export const ProposalsInformation = styled(Box)<{ proposals?: string }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0.5rem;
  border-radius: 15px;
  border: 1px solid
    ${({ proposals, theme }) =>
      proposals === 'active' ? theme.colors.active : theme.colors.grey};
  background-color: ${({ theme }) => theme.colors.bg1};
  color: ${({ proposals, theme }) =>
    proposals === 'active' ? theme.colors.active : theme.colors.grey};
  padding: 0.25rem 0.4rem;
`;
