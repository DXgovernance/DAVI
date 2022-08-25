import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SidebarInfoCard } from 'components/SidebarInfoCard';
import { SidebarInfoCardProps } from './types';
import { BigNumber } from 'ethers';

export default {
  title: 'SidebarInfoCard',
  component: SidebarInfoCard,
  argTypes: {
    proposalTime: {
      description: 'Duration of the proposal',
    },
    quorum: {
      description: 'Quorum percentage',
    },
  },
} as ComponentMeta<typeof SidebarInfoCard>;

const sidebarInfoCardArgs: SidebarInfoCardProps = {
  proposalTime: BigNumber.from(15888),
  quorum: 1,
};

const Template: ComponentStory<typeof SidebarInfoCard> = args => (
  <SidebarInfoCard {...args} />
);

export const Simple = Template.bind({});
Simple.args = sidebarInfoCardArgs;

export const Loading = Template.bind({});
Loading.args = {};
