import { PickerProps } from './types';

export const fullProps: PickerProps = {
  data: [
    {
      id: '0',
      title: 'Other value',
      subtitle: 'There are no tokens here',
      value: '0',
    },
    {
      id: '1',
      title: 'Token1',
      subtitle: 'This is the token one',
      value: 'value token 1',
      rightData: 135,
    },
    {
      id: '2',
      title: 'Token2',
      value: 'value token 2',
    },
    {
      id: '3',
      title: 'Token3',
      subtitle:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vehicula ex non malesuada pretium. Morbi tristique justo id placerat tincidunt. Mauris tincidunt, enim id molestie sagittis, urna nisl pretium elit',

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
      subtitle: 'Indeed this is sub-text',
      value: 'value token 5',
      rightData: 350,
    },
  ],
  header: 'Pick a token',
  isOpen: true,
  onSelect: option => console.log(option),
  onClose: () => {},
};

export const propsWithIcon: PickerProps = {
  data: [
    {
      id: '0',
      title: 'Other value',
      subtitle: 'There are no tokens here',
      value: '0',
      icon: null,
    },
    {
      id: '1',
      title: 'Token1',
      subtitle: 'This is the token one',
      value: 'value token 1',
      rightData: 135,
      icon: null,
    },
    {
      id: '2',
      title: 'Token2',
      value: 'value token 2',
      icon: null,
    },
    {
      id: '3',
      title: 'Token3',
      subtitle:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vehicula ex non malesuada pretium. Morbi tristique justo id placerat tincidunt. Mauris tincidunt, enim id molestie sagittis, urna nisl pretium elit',

      value: 'value token 3',
      icon: null,
    },
  ],
  header: 'Pick a token',
  isOpen: true,
  onSelect: option => console.log(option),
  onClose: () => {},
};

export const lengthyData: PickerProps = {
  isOpen: true,
  onSelect: option => console.log(option),
  onClose: () => {},
  header: 'Pick a pair',
  data: [
    {
      id: '1',
      title: 'Aliquam ultrices iaculis',
      subtitle: 'faucibus ut, nulla. Cras eu tellus eu augue',
      value: 'augue id',
      rightData: 170,
    },
    {
      id: '2',
      title: 'felis, adipiscing',
      subtitle: 'eget lacus.',
      value: 'amet risus. Donec egestas. Aliquam nec enim.',
      rightData: '298',
    },
    {
      id: '3',
      title: 'malesuada augue ut lacus.',
      subtitle: 'non leo. Vivamus nibh dolor, nonummy',
      value: 'neque non',
    },
    {
      id: '4',
      title: 'faucibus orci luctus',
      subtitle: 'euismod urna. Nullam lobortis quam a felis',
      value:
        'a, enim. Suspendisse aliquet, sem ut cursus luctus, ipsum leo elementum sem, vitae',
      rightData: 363,
    },
    {
      id: '5',
      title: 'cursus et, eros.',
      subtitle: 'enim, gravida sit amet,',
      value: 'nunc sed libero. Proin sed turpis nec mauris',
      rightData: 75,
    },
    {
      id: '6',
      title: 'semper erat, in consectetuer ipsum',
      value: 'metus vitae',
    },
    {
      id: '7',
      title: 'varius et, euismod et, commodo',
      subtitle:
        'ligula. Aenean euismod mauris eu elit. Nulla facilisi. Sed neque. Sed',
      value: 'tincidunt nibh. Phasellus',
      rightData: '182',
    },
    {
      id: '8',
      title: 'congue. In scelerisque scelerisque',
      subtitle: 'aliquet nec, imperdiet nec, leo. Morbi neque',
      value:
        'at, iaculis quis, pede. Praesent eu dui. Cum sociis natoque penatibus',
      rightData: 470,
    },
    {
      id: '9',
      title: 'Donec vitae erat',
      value: 'mauris ipsum porta elit,',
      rightData: 227,
    },
    {
      id: '10',
      title: 'auctor ullamcorper, nisl',
      subtitle:
        'rutrum lorem ac risus. Morbi metus. Vivamus euismod urna. Nullam lobortis quam a',
      value:
        'imperdiet, erat nonummy ultricies ornare, elit elit fermentum risus, at fringilla',
      rightData: 395,
    },
    {
      id: '11',
      title: 'pellentesque massa',
      subtitle:
        'in faucibus orci luctus et ultrices posuere cubilia Curae Phasellus ornare. Fusce mollis. Duis',
      value: 'sagittis placerat. Cras dictum ultricies ligula. Nullam enim.',
      rightData: 8,
    },
    {
      id: '12',
      title: 'habitant morbi tristique senectus',
      subtitle:
        'id, libero. Donec consectetuer mauris id sapien. Cras dolor dolor, tempus',
      value: 'nec mauris blandit mattis. Cras eget nisi dictum augue malesuada',
      rightData: 213,
    },
    {
      id: '13',
      title: 'malesuada fames ac turpis',
      subtitle:
        'ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae Phasellus',
      value: 'arcu iaculis enim, sit amet ornare lectus justo',
      rightData: 449,
    },
    {
      id: '14',
      title: 'ac',
      subtitle:
        'tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam fringilla',
      value:
        'aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos.',
    },
    {
      id: '15',
      title: 'Donec tincidunt.',
      subtitle: 'justo sit amet nulla. Donec',
      value:
        'Aliquam fringilla cursus purus. Nullam scelerisque neque sed sem egestas blandit. Nam',
      rightData: 182,
    },
  ],
};
