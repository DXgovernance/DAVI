import { ComponentStory, ComponentMeta } from '@storybook/react';
import { fullParameters } from './fixtures';
import { DiscussionCard } from './DiscussionCard';

export default {
  title: 'DiscussionCard',
  component: DiscussionCard,
  argTypes: {
    discussion: {
      description: 'Object containing data about a single discussion',
    },
  },
} as ComponentMeta<typeof DiscussionCard>;

const Template: ComponentStory<typeof DiscussionCard> = args => (
  <DiscussionCard {...args} />
);

export const Simple = Template.bind({});
Simple.args = fullParameters;
