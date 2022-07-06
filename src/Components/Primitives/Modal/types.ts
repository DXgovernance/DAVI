export interface ModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  children: JSX.Element;
  header?: JSX.Element | string;
  contentHeader?: JSX.Element | string;
  hideHeader?: boolean;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  maxWidth?: number;
  showSecondaryHeader?: boolean;
  cross?: boolean;
  zIndex?: number;
  backnCross?: boolean;
  prevContent?: () => void;
  leftIcon?: boolean;
  dataTestId?: string;
}
