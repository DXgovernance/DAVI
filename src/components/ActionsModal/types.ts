import { DecodedAction } from 'components/ActionsBuilder/types';

export interface ActionModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onAddActions: (action: DecodedAction[]) => void;
  onEditAction: (action: DecodedAction) => void;
  action?: DecodedAction;
  isEditing?: boolean;
}
