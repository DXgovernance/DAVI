import { ComponentStory, ComponentMeta } from '@storybook/react';
import AddressButton from 'components/AddressButton/AddressButton';
import { fullProps, partialProps, showFullAddress } from './fixtures';

export default {
  title: 'components/AddressButton',
  component: AddressButton,
  argTypes: {
    address: {
      description: 'Proposal creator address',
    },
    transactionsCounter: {
      description: 'Number of transactions of the proposal',
    },
  },
} as ComponentMeta<typeof AddressButton>;

const Template: ComponentStory<typeof AddressButton> = args => (
  <AddressButton {...args} />
);

export const WithTransactions = Template.bind({});
WithTransactions.args = fullProps;

export const WithoutTransactions = Template.bind({});
WithoutTransactions.args = partialProps;

export const ShowFullAddress = Template.bind({});
ShowFullAddress.args = showFullAddress;

export const Loading = Template.bind({});
Loading.args = {};
