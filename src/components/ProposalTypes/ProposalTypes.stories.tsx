import { ComponentStory, ComponentMeta } from '@storybook/react';
import ProposalTypes from './ProposalTypes';
import { testProps } from './fixtures';

export default {
  title: 'components/ProposalTypes',
  component: ProposalTypes,
} as ComponentMeta<typeof ProposalTypes>;

const Template: ComponentStory<typeof ProposalTypes> = args => (
  <ProposalTypes {...args} />
);

export const Default = Template.bind({});
Default.args = testProps;
Default.storyName = 'ProposalTypes';
