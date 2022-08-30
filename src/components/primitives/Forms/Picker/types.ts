export interface PickerProps {
  data: Option[];
  header: string;
  isOpen: boolean;
  onSelect: any;
  onClose: () => void;
  searchConfig?: SearchConfig;
  numberOfVisibleItems?: number;
}

export interface Option {
  title: string;
  subtitle?: string;
  id?: string;
  value?: any;
  icon?: any;
  rightData?: number | string;
  [key: string]: any;
}

export type OptionWithId = Option & { id: string };

export interface OptionListItemProps {
  item: Option;
  onSelect: (argument: any) => any;
}

interface SearchConfig {
  fields: string[];
  storeFields: string[];
  searchOptions?: object;
}
