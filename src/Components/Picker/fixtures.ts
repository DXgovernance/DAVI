import { PickerProps } from './types';

export const fullProps: PickerProps = {
  data: [
    {
      id: '0',
      title: 'Different',
      subtitle: 'There are no references here',
      value: '0',
    },
    {
      id: '1',
      title: 'Token1',
      subtitle: 'This is the token one',
      value: 'value token 1',
    },
    {
      id: '2',
      title: 'Token2',
      value: 'value token 1',
      balance: 150,
    },
  ],
  isOpen: true,
  onSelect: option => console.log(option),
  onClose: () => {},
};
