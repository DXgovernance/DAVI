export interface PickerProps {
  data: Option[];
  isOpen: boolean;
  onSelect: () => void;
  onClose: () => void;
}

interface Option {
  value: string | number;
  title: string;
  subtitle: string;
  icon?: any;
  balance?: number;
}
