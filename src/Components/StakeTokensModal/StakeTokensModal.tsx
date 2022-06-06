import { Loading } from 'Components/Primitives/Loading';
import { Modal } from 'old-components/Guilds/common/Modal';
import { StakeTokensModalProps } from './types';

const StakeTokensModal: React.FC<StakeTokensModalProps> = ({
  isOpen,
  onDismiss,
  token,
  StakeTokens
}: any) => {
  return (
    <Modal
      header={
        token ? (
          `Stake ${token.name} tokens`
        ) : (
          <Loading loading text skeletonProps={{ width: '100px' }} />
        )
      }
      isOpen={isOpen}
      onDismiss={onDismiss}
      maxWidth={300}
    >
      <StakeTokens />
    </Modal>
  );
};

export default StakeTokensModal;

// StakeTokensModal --> StakeTokensWrapper

