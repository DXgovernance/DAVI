import { ParamDetail } from 'components/ActionsBuilder/CallDetails/CallDetails.styled';
import { BiLinkExternal } from 'react-icons/bi';
import { FiExternalLink } from 'react-icons/fi';
import { StyledSegmentLink } from './styles';
import { ExternalLinkProps } from './types';
import { UnstyledExternalLink } from './styles';

export const ExternalLink: React.FC<ExternalLinkProps> = ({
  href,
  children,
  unstyled,
}) => {
  if (unstyled) {
    return (
      <UnstyledExternalLink href={href} target="_blank" rel="noopener">
        <ParamDetail>
          {children}
          <FiExternalLink size={14} />
        </ParamDetail>
      </UnstyledExternalLink>
    );
  }

  return (
    <StyledSegmentLink href={href} target="_blank" rel="noopener">
      {children}
      <BiLinkExternal />
    </StyledSegmentLink>
  );
};
