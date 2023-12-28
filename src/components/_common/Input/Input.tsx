import styled from "@emotion/styled";
import { useState, KeyboardEvent } from "react";
import InputUpload from "./InputUpload";

interface InputProps {
  width?: string;
  height?: string;
  placeholder: string;
  isTextarea?: boolean;
  hasTags?: boolean;
  tags?: string[];
  hasImage?: boolean;
  image?: string;
}

interface IInputStyle{
  width: string;
  height: string;
}

export const Input = ({
  width = '100%',
  height = 'auto',
  placeholder,
  isTextarea = false,
  hasTags = false,
  tags: initialTags = [],
  hasImage = false,
  image: initialImage,
}: InputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState(initialTags);
  const [image, setImage] = useState<string | null>(initialImage || null);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    <StInputContainer width={width} height={height}>
      {isTextarea ? (
        <StTextArea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
        />
      ) : (
        <StInputText
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
        />
      )}

      {/* TODO: 태그 컴포넌트 병합시 진행 */}
      {hasTags && (
        <StTagsContainer>
          {tags.map((tag, index) => (
            <StTag key={index}>
              {tag}
              <StTagRemoveButton onClick={() => handleTagRemove(index)}>x</StTagRemoveButton>
            </StTag>
          ))}
        </StTagsContainer>
      )}

      {/* TODO: Image 클릭 시 확장 어떻게 진행할지 */}
      {hasImage && (
        !image ? (
          <StImageContainer>
            <StyledUpload>
              <InputUpload onChange={handleImageChange}>+</InputUpload>
            </StyledUpload>
          </StImageContainer>
        ) : (
          <StImageContainer>
            <StImage style={{ backgroundImage: `url(${image})` }} onClick={handleImageZoom}>
              <StImageDeleteButton onClick={handleImageRemove}>x</StImageDeleteButton>
            </StImage>
          </StImageContainer>
        )
      )}

    </StInputContainer>
  );
};

// TODO: color 변수로 수정하기
const StInputContainer = styled.div<IInputStyle>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border: 1px solid #EDEDED;
  border-radius: 8px;
  min-height: 50px;
  padding: 15px 24px;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  
  &:focus-within {
    border-color: #228BB4;
  }
`;

const StInputText = styled.input`
  border: none;
  outline: none;
  width: 100%;
  height: 24px;
  font-size: 16px;
`;

const StTextArea = styled.textarea`
  border: none;
  outline: none;
  width: 100%;
  min-height: 24px;
  font-size: 16px;
  resize: none;
  overflow-y: scroll; 

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StTagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 10px;
`;

// TODO: color 통일
const StTag = styled.div`
  background: #EEE;
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
  border: 1px solid #EDEDED;
  border-radius: 8px;
`;