import { ComponentStory, ComponentMeta } from '@storybook/react';
import DurationInput from './DurationInput';

// import { fullParameters, loadingParameters, noProposals } from './fixture';

export default {
  title: 'DurationInput',
  component: DurationInput,
  argTypes: {
    value: {
      description: 'value',
    },
  },
} as ComponentMeta<typeof DurationInput>;

const Template: ComponentStory<typeof DurationInput> = args => (
  <DurationInput {...args} />
);

export const Simple = Template.bind({});
Simple.args = {};
