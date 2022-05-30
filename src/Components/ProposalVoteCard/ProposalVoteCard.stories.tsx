import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ProposalVoteCard } from 'Components/ProposalVoteCard';
import { mockProposalVoteCardProps } from './mocks';

export default {
  title: 'ProposalVoteCard',
  component: ProposalVoteCard,
  argTypes: {
    voteData: {
      description: '',
    },
    votingPower: {
      description: '',
    },
    proposal: {
      description: '',
    },
    timestamp: {
      description: '',
    },
    contract: {
      description: '',
    },
    currentLockedPercent: {
      description: '',
    },
    createTransaction: {
      description: '',
    },
  },
} as ComponentMeta<typeof ProposalVoteCard>;

const Template: ComponentStory<typeof ProposalVoteCard> = args => (
  <ProposalVoteCard {...args} />
);

export const Simple = Template.bind({});
Simple.args = mockProposalVoteCardProps;

export const Loading = Template.bind({});
Loading.args = {};
