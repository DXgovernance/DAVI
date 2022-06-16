import { DecodedAction } from 'Components/ActionsBuilder/types';

export interface ActionModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onAddAction: (action: DecodedAction) => void;
}
