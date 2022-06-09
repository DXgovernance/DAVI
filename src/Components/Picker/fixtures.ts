import { PickerProps } from './types';

export const fullProps: PickerProps = {
  data: [
    {
      title: 'Token0',
      subtitle: 'This is the token zero',
      value: 'value token 0',
    },
    {
      title: 'Token1',
      subtitle: 'This is the token one',
      value: 'value token 1',
    },
    {
      title: 'Token2',
      value: 'value token 1',
      balance: 150,
    },
  ],
  isOpen: true,
  onSelect: option => console.log(option),
  onClose: () => {},
};
