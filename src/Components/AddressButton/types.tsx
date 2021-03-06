export interface AddressButtonProps {
  address?: string;
  transactionsCounter?: number;
  onClick?: () => void;
  showFullAddress?: boolean;
  type?: 'button' | 'submit' | 'reset';
}
