import { ComponentStory, ComponentMeta } from '@storybook/react';
import { GuildSidebar } from './GuildSidebar';
import { withData } from './fixtures';

export default {
  title: 'Sidebars/GuildSidebar/GuildSidebar',
  component: GuildSidebar,
} as ComponentMeta<typeof GuildSidebar>;

const Template: ComponentStory<typeof GuildSidebar> = args => (
  <GuildSidebar {...args} />
);

export const Simple = Template.bind({});
Simple.args = withData;

export const Loading = Template.bind({});
Loading.args = {};
