import { ProposalDescriptionWrapper } from './styles';
import { ProposalDescriptionProps } from './types';
import Markdown from 'markdown-to-jsx';
import { Loading } from 'Components/Primitives/Loading';

const ProposalDescription: React.FC<ProposalDescriptionProps> = ({
  t,
  metadata,
  error,
}) => {
  if (error) {
    return (
      <ProposalDescriptionWrapper>
        {t('errorMessage.proposalDescriptionError')}
      </ProposalDescriptionWrapper>
    );
  }

  return (
    <ProposalDescriptionWrapper>
      {metadata?.description ? (
        <Markdown>{metadata.description}</Markdown>
      ) : (
        <Loading loading text skeletonProps={{ width: '800px' }} />
      )}
    </ProposalDescriptionWrapper>
  );
};

export default ProposalDescription;
