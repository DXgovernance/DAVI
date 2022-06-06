import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ProposalVoteCard } from 'Components/ProposalVoteCard';
import { mockProposalVoteCardProps } from './fixture';

export default {
  title: 'ProposalVoteCard',
  component: ProposalVoteCard,
  argTypes: {
    voteData: {
      description:
        'Information about vote options, quorum, total locked and token',
    },
    votingPower: {
      description: 'Information about user voting power',
    },
    proposal: {
      description:
        'Information about proposal id, description, vote options descriptions, and proposal endtime',
    },
    timestamp: {
      description: 'Timestamp of last rerender',
    },
    contract: {
      description: 'ERC20 Guild contract methods',
    },
    currentLockedPercent: {
      description: 'Current locked percent in the contract',
    },
    createTransaction: {
      description: 'Transaction to be created',
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
