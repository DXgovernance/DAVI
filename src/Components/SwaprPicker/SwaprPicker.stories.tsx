import { ComponentStory, ComponentMeta } from '@storybook/react';
import { fireEvent, within } from '@storybook/testing-library';
import { useState } from 'react';
import SwaprPicker from './SwaprPicker';

export default {
  title: 'SwaprPicker',
  component: SwaprPicker,
} as ComponentMeta<typeof SwaprPicker>;

// jest.mock('useWeb3React', () => 1);

const StateWrapper = () => {
  const [value, setValue] = useState('');
  const onChange = (e: string) => setValue(e);

  return <SwaprPicker value={value} onChange={onChange} />;
};

const Template: ComponentStory<typeof SwaprPicker> = args => {
  return <StateWrapper />;
};

export const Opened = Template.bind({});
Opened.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const getItem = () => canvas.findByLabelText('Swapr picker button');
  const pickerButton = await getItem();
  await fireEvent.click(pickerButton);
};
export const Closed = Template.bind({});
