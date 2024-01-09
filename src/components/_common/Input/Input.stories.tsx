import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { InputCompound } from './InputCompound';

interface InputProps {
  fontSize?: number;
  width?: number | string;
  placeholder?: string;
  textarea?: boolean;
  hasTags?: boolean;
  tags: string[];
  image?: string;
  hasImage?: boolean;
}

const meta: Meta<typeof Input> = {
  component: Input,
  args: {
    tags: [],
    placeholder: 'placeholder',
  },
  argTypes: {
    fontSize: { control: 'number' },
    width: { control: 'text' },
    placeholder: { control: 'text' },
    isTextarea: { control: 'boolean' },
    hasTags: { control: 'boolean' },
    tags: { control: 'array' },
    image: { control: 'text' },
    hasImage: { control: 'boolean' },
  },
};

export default meta;

// export const Default: StoryObj<InputProps> = {
//   args: {},
// };

// export const TagsInput: StoryObj<InputProps> = {
//   args: {
//     hasTags: true,
//     tags: [
//       'Tag1',
//       'Tag2',
//       'Tag3',
//       'Tag4',
//       'Tag5',
//       'Tag6',
//       'Tag7',
//       'Tag8',
//       'Tag9',
//       'Tag10',
//     ],
//   },
// };

// export const ImageInput: StoryObj<InputProps> = {
//   args: {
//     hasImage: true,
//     image: 'https://picsum.photos/200',
//   },
// };

export const DefaultTest: StoryObj<InputProps> = {
  render: () => (
    <InputCompound>
      <InputCompound.Text placeholder="입력" />
    </InputCompound>
  ),
};

export const TextAreaTest: StoryObj<InputProps> = {
  render: () => (
    <InputCompound>
      <InputCompound.TextArea placeholder="입력" />
    </InputCompound>
  ),
};

export const TagsInputCompound: StoryObj<InputProps> = {
  render: () => (
    <InputCompound>
      <InputCompound.Text placeholder="입력" />
      <InputCompound.Tags tags={['1', '2', '3']} />
    </InputCompound>
  ),
};

export const ImageInputCompound: StoryObj<InputProps> = {
  render: () => (
    <InputCompound>
      <InputCompound.Text placeholder="입력" />
      <InputCompound.Image image="https://picsum.photos/200" />
    </InputCompound>
  ),
};
