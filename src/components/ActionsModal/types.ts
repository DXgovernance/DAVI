import { DecodedAction } from 'components/ActionsBuilder/types';

export interface ActionModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onAddAction: (action: DecodedAction) => void;
  action?: DecodedAction;
}

export interface SelectedFunction {
  functionName: string;
  title: string;
}
