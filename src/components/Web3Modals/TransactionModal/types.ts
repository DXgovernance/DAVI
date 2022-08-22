import { ModalProps } from 'components/Primitives/Modal';

export enum TransactionModalView {
  Confirm,
  Submit,
  Reject,
}

export type TransactionModalProps = {
  message: string;
  transactionHash: string;
  txCancelled: boolean;
} & Pick<ModalProps, 'onCancel'>;
