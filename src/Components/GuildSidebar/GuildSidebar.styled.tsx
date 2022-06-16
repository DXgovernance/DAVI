import styled from 'styled-components';
import { Box } from '../Primitives/Layout';
import { Menu, MenuItem } from 'old-components/Guilds/common/Menu';
import { Heading } from 'old-components/Guilds/common/Typography';

export const SidebarWrapper = styled(Box)`
  color: ${({ theme }) => theme.colors.text};
  @media only screen and (min-width: 768px) {
    margin-right: 1rem;
    border: 1px solid ${({ theme }) => theme.colors.muted};
    border-radius: ${({ theme }) => theme.radii.curved};
  }
`;

export const DaoInfoPanel = styled(Box)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.muted};
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

export const DaoInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const DaoBrand = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media only screen and (min-width: 768px) {
    flex-direction: column;
  }
`;

export const DaoIcon = styled.img`
  height: 3rem;
  width: 3rem;
`;

export const DaoTitle = styled(Heading)`
  margin-left: 4px;
  line-height: 1;
`;

export const DaoMemberCount = styled(Box)`
  margin-bottom: 0.5rem;
`;

export const SidebarMenu = styled(Menu)`
  margin: 0;
  padding: 1rem 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media only screen and (min-width: 768px) {
    flex-direction: column;
  }
`;

export const SidebarMenuItem = styled(MenuItem)`
  padding: 0.8rem 1rem;

  @media only screen and (min-width: 768px) {
    border-left: 2px solid transparent;
  }

  &:hover {
    border-bottom: 2px solid ${({ theme }) => theme.colors.muted};

    @media only screen and (min-width: 768px) {
      border-left: 2px solid ${({ theme }) => theme.colors.muted};
      border-bottom: initial;
    }
  }

  &:active {
    border-bottom: 2px solid ${({ theme }) => theme.colors.muted};

    @media only screen and (min-width: 768px) {
      border-left: 2px solid ${({ theme }) => theme.colors.muted};
      border-bottom: initial;
    }
  }
`;
