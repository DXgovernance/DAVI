import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { ZERO_ADDRESS } from 'utils';
import { AddressInput } from './AddressInput';

export default {
  title: 'AddressInput',
  component: AddressInput,
  argTypes: {
    value: {
      description: 'value',
    },
    onChange: {
      description:
        'method that gets triggered when the value of the input changes',
    },
    isInvalid: {
      description: 'marks the field as invalid, changing its style',
    },
    disabled: {
      description: 'prevents the user from interacting with the input field',
    },
    enableENSName: {
      description:
        'enabled by default, it allows the user to input an ENS name as well as an address. If an ENS name is used, it fetches the corresponding address (or lack thereof)',
    },
  },
} as ComponentMeta<typeof AddressInput>;

const StateWrapper = args => {
  const [value, setValue] = useState(ZERO_ADDRESS);
  return <AddressInput value={value} onChange={setValue} {...args} />;
};

const Template: ComponentStory<typeof AddressInput> = args => (
  <StateWrapper {...args} />
);

export const Simple = Template.bind({});
Simple.args = {};

export const Invalid = Template.bind({});
Invalid.args = { isInvalid: true };

export const Disabled = Template.bind({});
Disabled.args = { disabled: true };
