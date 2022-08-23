import { Loading } from 'components/primitives/Loading';
import { Modal } from 'components/primitives/Modal';
import { StakeTokensModalProps } from './types';

const StakeTokensModal: React.FC<StakeTokensModalProps> = ({
  isOpen,
  onDismiss,
  StakeTokensForm,
  StakeTokensFormProps,
}) => {
  return (
    <Modal
      header={
        StakeTokensFormProps?.token ? (
          `Stake ${StakeTokensFormProps.token?.name} tokens`
        ) : (
          <Loading loading text skeletonProps={{ width: '100px' }} />
        )
      }
      isOpen={isOpen}
      onDismiss={onDismiss}
      maxWidth={300}
    >
      <StakeTokensForm {...StakeTokensFormProps} />
    </Modal>
  );
};

export default StakeTokensModal;
