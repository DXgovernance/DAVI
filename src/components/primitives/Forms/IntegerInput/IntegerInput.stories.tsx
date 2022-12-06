import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { IntegerInput } from './IntegerInput';

export default {
  title: 'IntegerInput',
  component: IntegerInput,
  argTypes: {
    value: {
      description: 'value',
    },
    onChange: {
      description:
        'method that gets triggered when the value of the input changes',
    },
  },
} as ComponentMeta<typeof IntegerInput>;

const StateWrapper = () => {
  const [value, setValue] = useState('');
  const onChange = (e: string) => setValue(e);
  return <IntegerInput value={value} onChange={onChange} />;
};

const Template: ComponentStory<typeof IntegerInput> = () => <StateWrapper />;

export const Simple = Template.bind({});
