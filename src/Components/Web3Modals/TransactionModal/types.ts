import { ModalProps } from 'Components/Primitives/Modal';

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
