import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DiffView } from './DiffView';
import { mockCodeOriginal, mockCodeUpdated } from './fixtures';

export default {
  title: 'components/DiffView',
  component: DiffView,
} as ComponentMeta<typeof DiffView>;

function DemoDiffView() {
  return <DiffView oldCode={mockCodeOriginal} newCode={mockCodeUpdated} />;
}

const Template: ComponentStory<typeof DiffView> = () => <DemoDiffView />;

export const Simple = Template.bind({});
Simple.storyName = 'Simple';
