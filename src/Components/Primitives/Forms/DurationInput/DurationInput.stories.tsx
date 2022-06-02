import { ComponentStory, ComponentMeta } from '@storybook/react';
import DurationInput from './DurationInput';

// import { fullParameters, loadingParameters, noProposals } from './fixture';

export default {
  title: 'DurationInput',
  component: DurationInput,
  argTypes: {
    isOpen: {
      description: 'Indicates weather the component is open',
    },
    onDismiss: {
      description: 'Function executed on dismiss',
    },
  },
} as ComponentMeta<typeof DurationInput>;

const Template: ComponentStory<typeof DurationInput> = args => (
  <DurationInput {...args} />
);

let testParameters = {
  isOpen: true,
  onDismiss: () => {},
};

export const Simple = Template.bind({});
Simple.args = testParameters;
