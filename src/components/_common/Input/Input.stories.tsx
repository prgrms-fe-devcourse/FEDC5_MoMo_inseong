import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

interface InputProps {
  width?: string;
  height?: string;
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
    placeholder: "placeholder",
  },
  argTypes: {
    width: { control: 'text' },
    height: { control: 'text' },
    placeholder: { control: 'text' },
    isTextarea: { control: 'boolean' },
    hasTags: { control: 'boolean' },
    tags: { control: 'array' },
    image: { control: 'text' },
    hasImage: { control: 'boolean' }
  },
};

export default meta;

export const Default: StoryObj<InputProps> = {
  args: {
    placeholder: "placeholder",
  },
};

export const TagsInput: StoryObj<InputProps> = {
  args: {
    placeholder: "placeholder",
    hasTags: true,
    tags: ["Tag1", "Tag2", "Tag3","Tag4", "Tag5", "Tag6","Tag7", "Tag8", "Tag9","Tag10"],
  },
};

export const ImageInput: StoryObj<InputProps> = {
  args: {
    placeholder: "placeholder",
    hasImage: true,
    image: "https://picsum.photos/200"
  },
};