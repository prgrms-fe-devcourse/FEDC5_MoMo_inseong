import styled from '@emotion/styled';
import { CSSProperties, useState } from 'react';
import { Icon } from '@common/Icon/Icon';
import { Tag } from '@common/Tag/Tag';

interface InputProps {
  tags?: string[];
  style?: CSSProperties;
}

export const InputTags = ({ tags: initialTags = [], ...props }: InputProps) => {
  const [tags, setTags] = useState(initialTags);

  const handleTagRemove = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <StTagsContainer
      hasTags={tags.length > 0}
      style={{ ...props.style }}>
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
  );
};

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
