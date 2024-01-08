import { InputContainer } from './Input/InputContainer';
import { InputImage } from './Input/InputImage';
import { InputTags } from './Input/InputTags';
import { InputText } from './Input/InputText';
import { InputTextArea } from './Input/InputTextArea';

export const InputTest = Object.assign(InputContainer, {
  Image: InputImage,
  Tags: InputTags,
  Text: InputText,
  TextArea: InputTextArea,
});
