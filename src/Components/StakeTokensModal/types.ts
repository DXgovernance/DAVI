export interface StakeTokensModalProps {
    isOpen: boolean;
    onDismiss: () => void;
    token: {
        name: string;
    };
  }
  