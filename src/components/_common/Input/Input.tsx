import styled from '@emotion/styled';
import { KeyboardEvent, useState } from 'react';
import InputUpload from './InputUpload';
import { LIGHT_GREY, PRIMARY_BLUE } from '@/style/colorConstants';
import { Icon } from '@common/Icon/Icon';
import { Tag } from '@common/Tag/Tag';

interface InputProps {
  fontSize?: number;
  width?: string | number;
  placeholder: string;
  isTextarea?: boolean;
  hasTags?: boolean;
  tags?: string[];
  hasImage?: boolean;
  image?: string;
}

interface IInputStyle {
  width: string | number;
  hasTags: boolean;
}

export const Input = ({
  fontSize = 16,
  width = 300,
  placeholder,
  isTextarea = false,
  hasTags = false,
  tags: initialTags = [],
  hasImage = false,
  image: initialImage,
  ...props
}: InputProps) => {
  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState(initialTags);
  const [image, setImage] = useState<string | null>(initialImage || null);

  const handleKeyUp = (
    event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (event.key === 'Enter' && inputValue.trim() && hasTags) {
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };

  // TODO: 추후 데이터 관련하여 다시 확인..
  const handleImageChange = (uploadedFile: File) => {
    setImage(URL.createObjectURL(uploadedFile));
  };

  const handleTagRemove = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleImageRemove = () => {
    setImage(null);
  };

  const handleImageZoom = () => {
    // TODO: 이미지 확대
  };

  return (
    <StInputContainer
      width={width}
      hasTags={hasTags}
      {...props}>
      {isTextarea ? (
        <StTextArea
          fontSize={fontSize}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={handleKeyUp}
          placeholder={placeholder}
        />
      ) : (
        <StInputText
          fontSize={fontSize}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={handleKeyUp}
          placeholder={placeholder}
        />
      )}

      {hasTags && (
        <StTagsContainer hasTags={tags.length > 0}>
          {tags.map((tag, index) => (
            <StTag key={`tag-${index}`}>
              <Tag
                key={index}
                name={tag}
                marginRight={4}
              />

              <Icon
                name="x"
                onIconClick={() => handleTagRemove(index)}
              />
            </StTag>
          ))}
        </StTagsContainer>
      )}

      {/* TODO: Image 클릭 시 확장 어떻게 진행할지 */}
      {hasImage &&
        (!image ? (
          <StImageContainer>
            <StyledUpload>
              <InputUpload onChange={handleImageChange}>
                <Icon name="plus" />
              </InputUpload>
            </StyledUpload>
          </StImageContainer>
        ) : (
          <StImageContainer>
            <StImage
              style={{ backgroundImage: `url(${image})` }}
              onClick={handleImageZoom}>
              <Icon
                name="x"
                showBackground={true}
                onIconClick={handleImageRemove}
              />
            </StImage>
          </StImageContainer>
        ))}
    </StInputContainer>
  );
};

const StInputContainer = styled.div<IInputStyle>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
  border: 1px solid ${LIGHT_GREY};
  border-radius: 8px;
  min-height: 50px;
  padding: 15px 24px;
  width: ${({ width, hasTags }) =>
    hasTags ? '100%' : typeof width === 'number' ? `${width}px` : width};

  &:focus-within {
    border-color: ${PRIMARY_BLUE};
  }
`;

const StInputText = styled.input<{ fontSize: number }>`
  border: none;
  outline: none;
  width: 100%;
  height: 24px;
  font-size: ${({ fontSize }) => `${fontSize}px`};
`;

const StTextArea = styled.textarea<{ fontSize: number }>`
  border: none;
  outline: none;
  width: 100%;
  min-height: 24px;
  font-size: ${({ fontSize }) => `${fontSize}px`};
  resize: none;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StTagsContainer = styled.div<{ hasTags: boolean }>`
  display: flex;
  flex-wrap: wrap;
  padding-top: ${({ hasTags }) => (hasTags ? '10px' : '0')};
`;

const StTag = styled.div`
  margin-right: 5px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: 'center';
`;

const StImageContainer = styled.div`
  margin-top: 10px;
`;

const StImage = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background-size: cover;
  background-position: center;
  cursor: pointer;
`;

const StyledUpload = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid ${LIGHT_GREY};
  border-radius: 8px;
`;
