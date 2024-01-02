import styled from '@emotion/styled';
import { CSSProperties, KeyboardEvent, useState } from 'react';
import InputUpload from './InputUpload';
import { LIGHT_GREY, PRIMARY_BLUE } from '@/style/colorConstants';

interface InputProps {
  type?: string;
  fontSize?: number;
  width?: string | number;
  placeholder: string;
  isTextarea?: boolean;
  hasTags?: boolean;
  tags?: string[];
  hasImage?: boolean;
  image?: string;
  style?: CSSProperties;
}

interface IInputStyle {
  width: string | number;
  hasTags: boolean;
}

export const Input = ({
  type = 'text',
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
    } else if (event.key === 'Enter') {
      setInputValue('');
      // TODO : 검색api요청하고, 결과값으로 리덕스에 검색결과 상태 갱신
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
      style={{ ...props.style }}
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
          type={type}
          fontSize={fontSize}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={handleKeyUp}
          placeholder={placeholder}
        />
      )}

      {/* TODO: 태그 컴포넌트 병합시 진행 */}
      {hasTags && (
        <StTagsContainer hasTags={tags.length > 0}>
          {tags.map((tag, index) => (
            <StTag key={index}>
              {tag}
              <StTagRemoveButton onClick={() => handleTagRemove(index)}>
                x
              </StTagRemoveButton>
            </StTag>
          ))}
        </StTagsContainer>
      )}

      {/* TODO: Image 클릭 시 확장 어떻게 진행할지 */}
      {hasImage &&
        (!image ? (
          <StImageContainer>
            <StyledUpload>
              <InputUpload onChange={handleImageChange}>+</InputUpload>
            </StyledUpload>
          </StImageContainer>
        ) : (
          <StImageContainer>
            <StImage
              style={{ backgroundImage: `url(${image})` }}
              onClick={handleImageZoom}>
              <StImageDeleteButton onClick={handleImageRemove}>
                x
              </StImageDeleteButton>
            </StImage>
          </StImageContainer>
        ))}
    </StInputContainer>
  );
};

// TODO: color 변수로 수정하기
const StInputContainer = styled.div<IInputStyle>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
  border: 1px solid ${LIGHT_GREY};
  border-radius: 8px;
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
  background: transparent;
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

// TODO: color 통일
const StTag = styled.div`
  background: #eee;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 4px 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
`;

const StTagRemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 4px;
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

// TODO: X 아이콘 컴포넌트 병합시 진행
const StImageDeleteButton = styled.span`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
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
