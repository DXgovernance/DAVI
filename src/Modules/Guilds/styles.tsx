import styled from 'styled-components';
import { Box } from 'components/Primitives/Layout/Box';
import { IconButton } from 'components/Primitives/Button';

export const PageContainer = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;

  @media only screen and (min-width: 768px) {
    grid-template-columns: minmax(0, 1fr) 300px;
  }
`;

export const SidebarContent = styled(Box)`
  @media only screen and (min-width: 768px) {
    margin-left: 1rem;
  }
  @media only screen and (max-width: 768px) {
    margin-top: 1rem;
  }
`;

export const PageContent = styled(Box)`
  @media only screen and (min-width: 768px) {
    margin-right: 1rem;
  }
`;

export const StyledButton = styled(IconButton)<{
  marginLeft?: string;
  size?: number | string;
}>`
  margin: 0;
  padding: 0.5rem 0.8rem;
  margin-left: ${props => props.marginLeft || 0};
`;

export const Label = styled.span<{
  color?: string;
  size?: number | string;
}>`
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: ${({ size }) => (size ? size : `14px`)};
  line-height: 20px;
  display: flex;
  color: ${({ color }) => (color ? color : '#BDC0C7')};
  margin: 12px 0px;
`;
