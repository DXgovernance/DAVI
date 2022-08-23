import { ComponentStory, ComponentMeta } from '@storybook/react';
import styled from 'styled-components';
import Tooltip from './Tooltip';

export default {
  title: 'Tooltip',
  component: Tooltip,
  argTypes: {
    content: {
      description: 'Text of the tooltip',
    },
    position: {
      description:
        'Position of the tooltip. Either above (top) or below (bottom) the element',
    },
    children: {
      description: 'Elements that will trigger the display of the tooltip',
    },
  },
} as ComponentMeta<typeof Tooltip>;

const Wrapper = styled.div`
  margin: 5rem;
`;

const Template: ComponentStory<typeof Tooltip> = args => (
  <Wrapper>
    <Tooltip {...args} />
  </Wrapper>
);

export const Top = Template.bind({});
Top.args = {
  content: 'Text of the tooltip',
  position: 'top',
  children: 'Top tooltip',
};

export const Bottom = Template.bind({});
Bottom.args = {
  content: 'Text of the tooltip',
  position: 'bottom',
  children: 'Bottom tooltip',
};
