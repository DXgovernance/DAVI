import { BiLinkExternal } from 'react-icons/bi';
import { StyledSegmentLink } from './StyledSegmentedLink';
import { ExternalLinkProps } from './types';

export const ExternalLink: React.FC<ExternalLinkProps> = ({
  href,
  children,
}) => {
  return (
    <StyledSegmentLink href={href} target="_blank" rel="noopener">
      {children}
      <BiLinkExternal />
    </StyledSegmentLink>
  );
};
