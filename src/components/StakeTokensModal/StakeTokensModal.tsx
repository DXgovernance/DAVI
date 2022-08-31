import { Loading } from 'components/primitives/Loading';
import { Modal } from 'components/primitives/Modal';
import { useTranslation } from 'react-i18next';
import { StakeTokensModalProps } from './types';

const StakeTokensModal: React.FC<StakeTokensModalProps> = ({
  isOpen,
  onDismiss,
  token,
  children,
}) => {
  const { t } = useTranslation();
  return (
    <Modal
      header={
        token ? (
          t('stakeTokens', { token: token.symbol })
        ) : (
          <Loading loading text skeletonProps={{ width: '100px' }} />
        )
      }
      isOpen={isOpen}
      onDismiss={onDismiss}
      maxWidth={300}
    >
      {children}
    </Modal>
  );
};

export default StakeTokensModal;
