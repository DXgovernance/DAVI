import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useTranslation } from 'react-i18next';
import { ProposalDescription } from './ProposalDescription';
import { withMetadata, noMetadata, errorMetadata } from './fixtures';

export default {
  title: 'ProposalDescription',
  component: ProposalDescription,
  argTypes: {
    t: {
      description: 'Translation library object',
    },
    metadata: {
      description:
        'Proposal metadata, used to populate the description of the proposal',
    },
    errorMetadata: {
      description: 'Error element populated if the metadata fetch fails',
    },
  },
} as ComponentMeta<typeof ProposalDescription>;

const TranslationWrapper = ({ args }) => {
  const { t } = useTranslation();
  args.t = t;

  return <ProposalDescription {...args} />;
};

const Template: ComponentStory<typeof ProposalDescription> = args => (
  <TranslationWrapper args={args} />
);

export const Simple = Template.bind({});
Simple.args = withMetadata;

export const Loading = Template.bind({});
Loading.args = noMetadata;

export const Error = Template.bind({});
Error.args = errorMetadata;
