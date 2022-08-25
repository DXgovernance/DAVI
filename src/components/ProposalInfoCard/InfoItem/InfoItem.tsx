import {
  InfoItemDescription,
  InfoItemLink,
  InfoItemText,
  InfoItemTitle,
  InfoItemWrapper,
} from './InfoItem.styled';
import { InfoItemProps } from './InfoItem.types';
import { FiExternalLink } from 'react-icons/fi';

const InfoItem: React.FC<InfoItemProps> = ({ title, description, link }) => {
  return (
    <InfoItemWrapper clickable={!!link}>
      <InfoItemText>
        <InfoItemTitle>{title}</InfoItemTitle>
        <InfoItemDescription>{description}</InfoItemDescription>
      </InfoItemText>
      {link && (
        <InfoItemLink href={link}>
          <FiExternalLink />
        </InfoItemLink>
      )}
    </InfoItemWrapper>
  );
};

export default InfoItem;
