import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from 'components/Primitives/Button';
import { useState } from 'react';
import { closedWithData, closedWithoutData } from './fixtures';
import {
  MemberInfoDropdown,
  MemberInfoDropdownProps,
} from './MemberInfoDropdown';

export default {
  title: 'Sidebars/GuildSidebar/MemberInfoDropdown',
  component: MemberInfoDropdown,
} as ComponentMeta<typeof MemberInfoDropdown>;

const StoryComponent: React.FC<MemberInfoDropdownProps> = props => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MemberInfoDropdown
      {...props}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <Button onClick={() => setIsOpen(!isOpen)}>Click to open</Button>
    </MemberInfoDropdown>
  );
};

const Template: ComponentStory<typeof StoryComponent> = args => (
  <StoryComponent {...args} />
);

export const Simple = Template.bind({});
Simple.args = closedWithData;

export const Loading = Template.bind({});
Loading.args = closedWithoutData;
