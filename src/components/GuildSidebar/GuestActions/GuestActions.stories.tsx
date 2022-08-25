import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withData } from './fixtures';
import { GuestActions } from './GuestActions';

export default {
  title: 'Sidebars/GuildSidebar/GuestActions',
  component: GuestActions,
} as ComponentMeta<typeof GuestActions>;

const Template: ComponentStory<typeof GuestActions> = args => (
  <GuestActions {...args} />
);

export const HasWallet = Template.bind({});
HasWallet.args = withData;

export const NoWallet = Template.bind({});
NoWallet.args = {};
