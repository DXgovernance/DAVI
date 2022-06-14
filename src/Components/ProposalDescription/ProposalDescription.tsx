import { ProposalDescriptionWrapper } from './ProposalDescription.styled';
import { ProposalDescriptionProps } from './types';
import Markdown from 'markdown-to-jsx';
import { Loading } from 'Components/Primitives/Loading';
import { useTranslation } from 'react-i18next';

const ProposalDescription: React.FC<ProposalDescriptionProps> = ({
  metadata,
  error,
}) => {
  const { t } = useTranslation();

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
        <Loading loading text skeletonProps={{ width: '100%' }} />
      )}
    </ProposalDescriptionWrapper>
  );
};

export default ProposalDescription;
