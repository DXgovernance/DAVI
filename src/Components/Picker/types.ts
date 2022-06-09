export interface PickerProps {
  data: Option[];
  isOpen: boolean;
  onSelect: any;
  onClose: () => void;
  searchConfig?: SearchConfig;
  numberOfVisibleItems?: number;
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

interface SearchConfig {
  fields: string[];
  storeFields: string[];
  searchOptions?: object;
}
