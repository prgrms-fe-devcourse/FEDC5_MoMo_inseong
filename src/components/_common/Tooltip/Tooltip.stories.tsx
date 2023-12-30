import type { Meta, StoryObj } from '@storybook/react';
import { createElement } from 'react';
import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  args: {
    gap: 0,
    offset: 0,
    width: 200,
    height: 300,
    shadowColor: '#0000006f',
    position: 'bottom',
  },
  argTypes: {
    gap: { type: 'number', control: 'range' },
    offset: { type: 'number', control: { type: 'range', min: -100 } },
    width: { type: 'number', control: { type: 'range', max: 400 } },
    height: { type: 'number', control: { type: 'range', max: 400 } },
    shadowColor: { control: 'color' },
  },
};

export default meta;
type StoryType = StoryObj<typeof Tooltip>;

export const Alert: StoryType = {
  args: {
    children: createElement('span', null, '🔔'),
    content: createElement(
      'ul',
      null,
      Array.from({ length: 5 }, (_, i) =>
        createElement('li', null, `${i + 1}번째 알람`),
      ),
    ),
    position: 'bottom',
    gap: 10,
    offset: 30,
  },
  render: (args) => (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
      }}>
      <Tooltip {...args} />
    </div>
  ),
};
