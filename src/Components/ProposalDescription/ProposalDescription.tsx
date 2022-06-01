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
        We ran into an error while trying to load the proposal content. Please
        refresh the page and try again.
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
