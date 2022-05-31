import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TokenPicker } from 'Components';
// import { data } from './fixtures';

export default {
  title: 'Components/TokenPicker',
  component: TokenPicker,
} as ComponentMeta<typeof TokenPicker>;

const Template: ComponentStory<typeof TokenPicker> = args => (
  <TokenPicker {...args} />
);

export const Default = Template.bind({});
Default.args = { isOpen: true, onClose: () => {}, onSelect: () => {} };
Default.storyName = 'TokenPicker';
