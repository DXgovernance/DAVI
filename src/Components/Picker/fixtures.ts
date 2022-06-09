import { PickerProps } from './types';

export const fullProps: PickerProps = {
  data: [
    {
      value: 'value token 0',
      title: 'Token0',
      subtitle: 'This is the token zero',
    },
    {
      value: 'value token 1',
      title: 'Token1',
      subtitle: 'This is the token one',
    },
  ],
  isOpen: true,
  onSelect: () => {},
  onClose: () => {},
};
