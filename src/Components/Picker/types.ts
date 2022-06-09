export interface PickerProps {
  data: Option[];
  isOpen: boolean;
  onSelect: any;
  onClose: () => void;
}

export interface Option {
  id: string;
  title: string;
  subtitle?: string;
  value?: any;
  icon?: any;
  balance?: number;
}

export interface OptionListItemProps {
  item: Option;
  onSelect: (argument: any) => any;
}
