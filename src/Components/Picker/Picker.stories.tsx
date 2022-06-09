import { ComponentMeta, ComponentStory } from '@storybook/react';
import Picker from './Picker';
import { fullProps } from './fixtures';

export default {
  title: 'Picker',
  component: Picker,
} as ComponentMeta<typeof Picker>;

const Template: ComponentStory<typeof Picker> = args => {
  return <Picker {...args} />;
};

export const Simple = Template.bind({});
Simple.args = fullProps;
