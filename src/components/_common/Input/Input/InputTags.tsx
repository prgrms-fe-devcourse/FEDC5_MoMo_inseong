import styled from '@emotion/styled';
import { CSSProperties } from 'react';
import { Icon, Tag } from '@common/index';

interface InputProps {
  tags: string[];
  setTags: (arg: string[]) => void;
  onTagRemove?: (tagName: string) => void;
  style?: CSSProperties;
}

export const InputTags = ({
  tags = [],
  setTags = () => {},
  onTagRemove,
  ...props
}: InputProps) => {
  const handleTagRemove = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };
  const refineTags = (tags: string[]) => {
    return tags.filter((tag) => tag.trim() !== '');
  };

  return (
    <StTagsContainer
      hasTags={tags.length > 0}
      style={{ ...props.style }}>
      {refineTags(tags).map((tag, index) => (
        <StTag key={`tag-${index}`}>
          <Tag
            key={index}
            name={`#${tag}`}
            marginRight={4}
          />
          <Icon
            name="x"
            onIconClick={() =>
              onTagRemove ? onTagRemove(tag) : handleTagRemove(index)
            }
          />
        </StTag>
      ))}
    </StTagsContainer>
  );
};

const StTagsContainer = styled.div<{ hasTags: boolean }>`
  border: 2px solid red;
  display: flex;
  flex-wrap: wrap;
  padding-top: ${({ hasTags }) => (hasTags ? '10px' : '0')};
  max-height: 80px;
  overflow-y: auto;
`;

const StTag = styled.div`
  margin-right: 5px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: 'center';
`;
