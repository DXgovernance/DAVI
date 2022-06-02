import { Loading } from 'Components/Primitives/Loading';
import { Modal } from 'old-components/Guilds/common/Modal';
import { StakeTokensModalProps } from './types';
import StakeTokensWrapper from 'Modules/Guilds/Wrappers/StakeTokensWrapper';

const StakeTokensModal: React.FC<StakeTokensModalProps> = ({
  isOpen,
  onDismiss,
  token,
}) => {
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
      <StakeTokensWrapper />
    </Modal>
  );
};

export default StakeTokensModal;

