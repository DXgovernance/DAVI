import { ModalProps } from 'components/primitives/Modal';

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
