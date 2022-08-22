import { ComponentStory, ComponentMeta } from '@storybook/react';
import { propsWithData } from './fixtures';
import { MemberActions } from './MemberActions';

export default {
  title: 'Sidebars/GuildSidebar/MemberActions',
  component: MemberActions,
} as ComponentMeta<typeof MemberActions>;

const Template: ComponentStory<typeof MemberActions> = args => (
  <MemberActions {...args} />
);

export const Simple = Template.bind({});
Simple.args = propsWithData;

export const Loading = Template.bind({});
Loading.args = {};
