import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StakeTokensModal } from 'components/StakeTokensModal';
import { mockStakeTokensModalProps } from './fixture';

export default {
  title: 'StakeTokensModal',
  component: StakeTokensModal,
  argTypes: {
    isOpen: {
      description: 'State for checking if modal is open',
    },
    onDismiss: {
      description: 'Closing the modal',
    },
    StakeTokensForm: {
      description: 'Form for staking tokens',
    },
    StakeTokensFormProps: {
      description: 'Props for staking tokens form',
    },
  },
} as ComponentMeta<typeof StakeTokensModal>;

const Template: ComponentStory<typeof StakeTokensModal> = args => (
  <StakeTokensModal {...args} />
);

export const Simple = Template.bind({});
Simple.args = mockStakeTokensModalProps;

export const Loading = Template.bind({});
Loading.args = {};
