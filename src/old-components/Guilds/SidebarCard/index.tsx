import styled, { css } from 'styled-components';
import { Card, CardProps } from '../common/Card';
import { Heading } from '../common/Typography';
import { Box } from '../../../Components/Primitives/Layout';

const cardWrapperProps = css`
  margin-bottom: 1rem;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
`;

const SidebarCardHeader = styled(Heading)`
  font-weight: 600;
  padding: 1rem 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.muted};
  margin: 0px;
`;

const SidebarCardContent = styled(Box)`
  padding: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const SidebarCard: React.FC<CardProps> = ({ header, children }) => {
  return (
    <Card customStyles={cardWrapperProps}>
      <SidebarCardHeader>{header}</SidebarCardHeader>
      <SidebarCardContent>{children}</SidebarCardContent>
    </Card>
  );
};

export default SidebarCard;

export const SidebarCardDivider = styled.hr`
  margin: 1rem -1.5rem;
  border-color: ${({ theme }) => theme.colors.border.initial};
`;
