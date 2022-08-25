import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Editor } from './Components/';
import { useTextEditor } from './useTextEditor';

export default {
  title: 'components/Editor',
  component: Editor,
  argTypes: {
    href: {
      description: 'URL to open on click',
    },
    votes: {
      description: 'Array of vote percentages for each option',
    },
  },
} as ComponentMeta<typeof Editor>;

function DemoEditor() {
  const { Editor, EditorConfig } = useTextEditor(
    `42/create-proposal`,
    345600000,
    'Enter text here'
  );
  return <Editor EditorConfig={EditorConfig} />;
}

const Template: ComponentStory<typeof Editor> = () => <DemoEditor />;

export const Simple = Template.bind({});
Simple.storyName = 'Editor';
