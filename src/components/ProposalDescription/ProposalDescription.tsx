import { ProposalDescriptionWrapper } from './ProposalDescription.styled';
import { ProposalDescriptionProps } from './types';
import Markdown from 'markdown-to-jsx';
import { Loading } from 'components/primitives/Loading';
import { useTranslation } from 'react-i18next';

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
      {metadata?.description ? (
        <Markdown
          options={{
            overrides: {
              a: { props: { target: '_blank' } },
            },
          }}
        >
          {metadata.description}
        </Markdown>
      ) : (
        <Loading loading text skeletonProps={{ width: '100%' }} />
      )}
    </ProposalDescriptionWrapper>
  );
};
