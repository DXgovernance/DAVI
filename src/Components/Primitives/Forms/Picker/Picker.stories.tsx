import { ComponentMeta, ComponentStory } from '@storybook/react';
import Picker from './Picker';
import { fullProps, swaprPairs } from './fixtures';

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

const Template: ComponentStory<typeof Picker> = args => {
  return <Picker {...args} />;
};

const SwaprTemplate: ComponentStory<typeof Picker> = args => {
  return <Picker {...args} />;
};

export const Simple = Template.bind({});
Simple.args = fullProps;

export const Swapr = SwaprTemplate.bind({});
Swapr.args = swaprPairs;
