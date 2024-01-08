import styled from '@emotion/styled';
import { IMentionedUser } from '@/api/_types/apiModels';
import { Tag } from '@common/Tag/Tag';

interface BadgeProps {
  kind: 'tag' | 'mention';
  data: string[] | IMentionedUser[];
}

export const Badge = ({ kind, data }: BadgeProps) => {
  return (
    <>
      <StBadgeContainer>
        {kind === 'tag' &&
          (data as string[]).map((tag, index) => (
            <StBadge key={`tag-${index}`}>
              <Tag
                name={`#${tag}`}
                hasMouseCursor={false}
                marginRight={2}
                fontSize={14}
              />
            </StBadge>
          ))}
        {kind === 'mention' &&
          (data as IMentionedUser[]).map((mention) => (
            <StBadge key={`mention-${mention._id}`}>
              <Tag
                name={'@' + mention.fullName}
                hasMouseCursor={true}
                marginRight={2}
                fontSize={14}
              />
            </StBadge>
          ))}
      </StBadgeContainer>
    </>
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
