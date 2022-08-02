import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DiffView } from './DiffView';

export default {
  title: 'Components/DiffView',
  component: DiffView,
} as ComponentMeta<typeof DiffView>;

function DemoDiffView() {
  const oldCode = `
  {
    "colors": {
      "text": "red",
      "primary": "#295FF4",
      "secondary": "#181B1B",
      "red": "#E75C5C",
      "orange": "#D17A06",
      "proposalText": {
        "lightGrey": "#BDC0C7",
        "grey": "orange"
      },
    }
  }
`;
  const newCode = `
  {
    "colors": {
      "text": "#fff",
      "primary": "#295FF4",
      "secondary": "#181B1B",
      "red": "#E75C5C",
      "orange": "#D17A06",
      "proposalText": {
        "grey": "#A1A6B0",
        "lightGrey": "#BDC0C7"
      },
    }
  }
`;

  return <DiffView oldCode={oldCode} newCode={newCode} />;
}

const Template: ComponentStory<typeof DiffView> = () => <DemoDiffView />;

export const Simple = Template.bind({});
Simple.storyName = 'JSON';
