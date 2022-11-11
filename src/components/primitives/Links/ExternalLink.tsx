import {} from 'components/ActionsBuilder/CallDetails/CallDetails.styled';
import { FiExternalLink } from 'react-icons/fi';
import { StyledSegmentLink, LinkDetail } from './styles';
import { ExternalLinkProps } from './types';

export const ExternalLink: React.FC<ExternalLinkProps> = ({
  href,
  children,
}) => {
  return (
    <StyledSegmentLink href={href} target="_blank" rel="noopener">
      <LinkDetail>{children}</LinkDetail>
      <FiExternalLink />
    </StyledSegmentLink>
  );
};
