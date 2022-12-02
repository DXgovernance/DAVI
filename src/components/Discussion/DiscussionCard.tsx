import { Card, CardProps } from 'components/Card';
import { cardWrapperStyles } from './Discussion.styled';

export const DiscussionCard: React.FC<CardProps> = ({ header, children }) => {
  return (
    <Card header={header} customStyles={cardWrapperStyles}>
      {children}
    </Card>
  );
};
