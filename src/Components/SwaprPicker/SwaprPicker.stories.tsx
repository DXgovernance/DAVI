import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';
import SwaprPicker from './SwaprPicker';

export default {
  title: 'SwaprPicker',
  component: SwaprPicker,
} as ComponentMeta<typeof SwaprPicker>;

const StateWrapper = () => {
  const [value, setValue] = useState('');
  const onChange = (e: string) => setValue(e);

  return <SwaprPicker value={value} onChange={onChange} />;
};

const Template: ComponentStory<typeof SwaprPicker> = args => {
  return <StateWrapper />;
};

export const Simple = Template.bind({});
