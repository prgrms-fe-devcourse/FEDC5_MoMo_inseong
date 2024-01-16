import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { IMentionedUser } from '@/api/_types/apiModels';
import { Tag } from '@common/index';

interface BadgeProps {
  kind: 'tag' | 'mention';
  data: string[] | IMentionedUser[];
}

export const Badge = ({ kind, data }: BadgeProps) => {
  const navigate = useNavigate();
  const refineTags = (tags: string[]) => {
    return tags.filter((tag) => tag.trim() !== '');
  };

  return (
    <StBadgeContainer>
      {kind === 'tag' &&
        refineTags(data as string[]).map((tag, index) => (
          <StBadge key={`tag-${index}`}>
            <Tag
              name={`#${tag}`}
              hasMouseCursor={false}
              marginRight={2}
              fontSize={12}
            />
          </StBadge>
        ))}
      {kind === 'mention' &&
        (data as IMentionedUser[]).map((mention, index) => (
          <StBadge
            key={`mention-${mention._id}-${index}`}
            onClick={() => navigate(`/profile/${mention._id}`)}>
            <Tag
              name={'@' + mention.fullName}
              hasMouseCursor={true}
              marginRight={2}
              fontSize={12}
            />
          </StBadge>
        ))}
    </StBadgeContainer>
  );
};

const StBadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;
const StBadge = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
  margin-bottom: 8px;
`;
