import { ProposalDescriptionWrapper } from './ProposalDescription.styled';
import { ProposalDescriptionProps } from './types';
import { Loading } from 'components/primitives/Loading';
import { useTranslation } from 'react-i18next';
import { Interweave } from 'interweave';
import { GlobalErrorBoundary } from 'components/ErrorBoundary';

export const ProposalDescription: React.FC<ProposalDescriptionProps> = ({
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
      <GlobalErrorBoundary>
        {metadata?.description ? (
          <Interweave content={metadata.description} />
        ) : (
          <Loading loading text skeletonProps={{ width: '100%' }} />
        )}
      </GlobalErrorBoundary>
    </ProposalDescriptionWrapper>
  );
};
