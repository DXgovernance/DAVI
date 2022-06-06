import { ComponentStory, ComponentMeta } from '@storybook/react';
import DurationInput from './DurationInput';
import { within, fireEvent } from '@storybook/testing-library';
import { defaultProps } from './fixtures';

// TODO: Currently, the number of seconds in the input component in storybook does not reflect what the user picked. This is just in storybook. Tests are working OK and the component works correctly in the app

export default {
  title: 'DurationInput',
  component: DurationInput,
  argTypes: {
    value: {
      description: 'value',
    },
  },
} as ComponentMeta<typeof DurationInput>;

const Template: ComponentStory<typeof DurationInput> = args => {
  return <DurationInput {...args} />;
};

export const Opened = Template.bind({});
Opened.args = defaultProps;
Opened.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const getItem = () => canvas.findByRole('input-modal');
  const inputItem = await getItem();
  await fireEvent.click(inputItem);
};

export const Closed = Template.bind({});
Closed.args = defaultProps;
