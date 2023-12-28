import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

interface InputProps {
  placeholder?: string;
  textarea?: boolean;
  useTags?: boolean;
  tags: string[];
  image?: string;
}

const meta: Meta<typeof Input> = {
  component: Input,
  args: {
    tags: [],
    placeholder: "placeholder",
  },
  argTypes: {
    placeholder: { control: 'text' },
    textarea: { control: 'boolean' },
    useTags: { control: 'boolean' },
    tags: { control: 'array' },
    image: { control: 'text' }
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
    useTags: true,
    tags: ["Tag1", "Tag2", "Tag3","Tag4", "Tag5", "Tag6","Tag7", "Tag8", "Tag9","Tag10"],
  },
};

export const ImageInput: StoryObj<InputProps> = {
  args: {
    placeholder: "placeholder",
    image: "https://picsum.photos/200"
  },
};