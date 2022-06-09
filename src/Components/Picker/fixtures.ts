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
      balance: 135,
    },
    {
      id: '2',
      title: 'Token2',
      value: 'value token 2',
    },
    {
      id: '3',
      title: 'Token3',
      subtitle: 'Some subtitle',
      value: 'value token 3',
    },
    {
      id: '4',
      title: 'Token4',
      value: 'value token 4',
    },
    {
      id: '5',
      title: 'Token5',
      value: 'value token 5',
      balance: 350,
    },
    {
      id: '6',
      title: 'Token6',
      subtitle: 'Indeed this is sub-text',
      value: 'value token 6',
    },
  ],
  isOpen: true,
  onSelect: option => console.log(option),
  onClose: () => {},
};
