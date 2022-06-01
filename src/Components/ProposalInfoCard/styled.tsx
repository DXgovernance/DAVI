import { Box } from 'Components/Primitives/Layout';
import { SidebarCardContent } from 'old-components/Guilds/SidebarCard';
import styled, { css } from 'styled-components';

export const Separator = styled.hr`
  margin: 1.5rem 0;
  border-color: ${({ theme }) => theme.colors.border.initial};
`;

export const InfoDetail = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

export const InfoDetailMuted = styled.span`
  color: ${({ theme }) => theme.colors.proposalText.grey};
`;

export const ProposalHistoryIcon = styled.span<{ active?: boolean }>`
  cursor: pointer;
  height: 1.25rem;
  width: 1.25rem;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.proposalText.grey};
  display: inline-flex;
  justify-content: center;
  align-items: center;

  &:hover {
    border-color: ${({ theme }) => theme.colors.border.hover};
  }

  ${({ active }) =>
    active &&
    css`
      border-color: ${({ theme }) => theme.colors.border.hover};
    `}
`;

export const SidebarCardContentUnpadded = styled(SidebarCardContent)`
  padding: 0;
`;

export const SidebarInfoContent = styled.div`
  margin: 1.5rem;
`;
