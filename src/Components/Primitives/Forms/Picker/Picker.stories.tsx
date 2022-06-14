import { ComponentMeta, ComponentStory } from '@storybook/react';
import Picker from './Picker';
import { fullProps, propsWithIcon, lengthyData } from './fixtures';
import Avatar from 'old-components/Guilds/Avatar';
import dxdaoIcon from 'assets/images/dxdao-icon.svg';

export default {
  title: 'Picker',
  component: Picker,
  argTypes: {
    data: {
      description: 'Array of option objects',
    },
    header: {
      description: 'Title for the picker',
    },
    isOpen: {
      description: 'Boolean for determining if the modal is open or closed',
    },
    onSelect: {
      description:
        'Callback to be executed once an item is selected. Gets passed the whole item as argument',
    },
    onClose: {
      description:
        'Callback to be executed when the modal is closed or an option is picked',
    },
    searchConfig: {
      description: 'Custom settings to tweak the search configuration',
    },
    numberOfVisibleItems: {
      description: 'Number of visible items of the picker',
    },
  },
} as ComponentMeta<typeof Picker>;

propsWithIcon.data.map(token => {
  return (token.icon = <Avatar src={dxdaoIcon} defaultSeed={null} />);
});

const Template: ComponentStory<typeof Picker> = args => {
  return <Picker {...args} />;
};

export const Simple = Template.bind({});
Simple.args = fullProps;

export const WithIcons = Template.bind({});
WithIcons.args = propsWithIcon;

export const Lengthy = Template.bind({});
Lengthy.args = lengthyData;
