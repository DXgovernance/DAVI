import styled from 'styled-components';
import { Box } from 'components/primitives/Layout/Box';
import { Menu } from 'components/Menu';
import { Heading } from 'components/primitives/Typography';

export const SidebarWrapper = styled(Box)`
  color: ${({ theme }) => theme.colors.text};
  @media only screen and (min-width: 768px) {
    margin-right: 1rem;
    border: 1px solid ${({ theme }) => theme.colors.border1};
    border-radius: ${({ theme }) => theme.radii.curved};
  }
`;

export const DaoInfoPanel = styled(Box)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border1};
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

export const SidebarMenuItem = styled.div<{ current?: boolean }>`
  padding: 0.8rem 1rem;
  color: ${({ current, theme }) =>
    current ? theme.colors.text : theme.colors.grey};

  @media only screen and (min-width: 768px) {
    border-left: 2px solid
      ${({ current, theme }) => (current ? theme.colors.text : 'transparent')};
  }

  &:hover {
    border-bottom: 2px solid ${({ theme }) => theme.colors.border1};

    @media only screen and (min-width: 768px) {
      border-left: 2px solid
        ${({ current, theme }) =>
          current ? theme.colors.text : theme.colors.border1};
      border-bottom: initial;
    }
  }

  &:active {
    border-bottom: 2px solid ${({ theme }) => theme.colors.border1};

    @media only screen and (min-width: 768px) {
      border-left: 2px solid ${({ theme }) => theme.colors.text};
      border-bottom: initial;
    }
  }
`;
