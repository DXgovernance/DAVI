import { Card, CardProps } from 'components/Card';
import { cardWrapperStyles } from './SidebarCard.styled';

export const SidebarCard: React.FC<CardProps> = ({ header, children }) => {
  return (
    <Card header={header} customStyles={cardWrapperStyles}>
      {children}
    </Card>
  );
};
