import { ComponentMeta, ComponentStory } from '@storybook/react';
import ProposalInfoCard from './ProposalInfoCard';
import { useTranslation } from 'react-i18next';
import { fullParameters } from './fixture';

export default {
  title: 'ProposalInfoCard',
  component: ProposalInfoCard,
  argTypes: {
    proposal: {
      description: 'Object containing all the proposal information',
    },
    guildConfig: {
      description: 'Object containing all the guild information',
    },
    quorum: {
      description: 'Amount of votes needed for the proposal to pass',
    },
    t: {
      description: 'Translation library object',
    },
  },
} as ComponentMeta<typeof ProposalInfoCard>;

const TranslationWrapper = ({ args }) => {
  const { t } = useTranslation();
  args.t = t;

  return <ProposalInfoCard {...args} />;
};

const Template: ComponentStory<typeof ProposalInfoCard> = args => (
  <TranslationWrapper args={args} />
);

export const Simple = Template.bind({});
Simple.args = fullParameters;
