import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ProposalCard, ProposalCardProps } from 'components/ProposalCard';
import { proposalStatusMock } from 'components/ProposalStatus/fixtures';
import { ensAvatarMock, proposalMock } from 'utils/fixtures';

export default {
  title: 'Proposals/ProposalCard',
  component: ProposalCard,
  argTypes: {
    href: {
      description: 'URL to open on click',
    },
    votes: {
      description: 'Array of vote percentages for each option',
    },
  },
} as ComponentMeta<typeof ProposalCard>;

const proposalCardArgs: ProposalCardProps = {
  proposal: proposalMock,
  ensAvatar: ensAvatarMock,
  href: '/',
  statusProps: proposalStatusMock,
};

const Template: ComponentStory<typeof ProposalCard> = args => (
  <ProposalCard {...args} />
);

const ManyTemplate: ComponentStory<typeof ProposalCard> = args => (
  <div>
    <Template {...args} />
    <Template {...args} />
    <Template />
  </div>
);

export const Simple = Template.bind({});
Simple.args = proposalCardArgs;

export const Loading = Template.bind({});
Loading.args = {};

export const Group = ManyTemplate.bind({});
Group.args = proposalCardArgs;
