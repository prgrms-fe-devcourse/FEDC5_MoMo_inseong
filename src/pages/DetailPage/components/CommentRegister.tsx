import styled from '@emotion/styled';
import { useState } from 'react';
import { TEXTAREA_CREATE_HEIGHT, TEXTAREA_HEIGHT } from './constants';
import { theme } from '@/style/theme';
import { Button } from '@common/Button/Button';

interface CommentRegisterProps {
  width: number;
  height: number;
  defaultValue: string;
  mode: 'create' | 'edit';
}

export const CommentRegister = ({
  width,
  height,
  defaultValue = '',
  mode,
}: CommentRegisterProps) => {
  const [text, setText] = useState(defaultValue);
  const [line, setLine] = useState(0);

  const onTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setLine(
      Math.ceil(
        (e.target.scrollHeight - TEXTAREA_HEIGHT) / TEXTAREA_CREATE_HEIGHT,
      ),
    );
  };

  return (
    <StCommentRegisterContainer mode={mode}>
      {/* isEditor가  true면 등록 버튼 우측 하단에 오게끔. 아 그리고 취소 버튼도 추가 */}
      <StTextarea
        value={text}
        onChange={onTextareaChange}
        style={{
          height: `${TEXTAREA_HEIGHT + line * TEXTAREA_CREATE_HEIGHT}px`,
        }}
        placeholder={mode === 'edit' ? '' : '댓글을 입력해 보세요.'}
      />
      {/* 버튼 누르면 데이터 전송 되게끔 */}
      <Button
        label="등록"
        width={width}
        height={height}
      />
    </StCommentRegisterContainer>
  );
};
const StCommentRegisterContainer = styled.div<{ mode: 'create' | 'edit' }>`
  display: ${(props) => (props.mode === 'edit' ? 'block' : 'flex')};
  margin-left: ${(props) => (props.mode === 'edit' ? 30 : 0)}px;
  align-items: center;
  width: 100%;

  & > button {
    margin-top: ${(props) => (props.mode === 'edit' ? 4 : 0)}px;
    margin-left: ${(props) => (props.mode === 'edit' ? 4 : 0)}px;
  }
`;

const StTextarea = styled.textarea`
  margin: 0 10px;
  flex-grow: 1;
  width: calc(100% - 40px);
  padding: 16px;
  padding-bottom: 24px;
  border: 1px solid ${theme.colors.grey.default};
  border-radius: 8px;
  resize: vertical; // 높이 조정 + 스크롤 제거

  &::placeholder {
    color: ${theme.colors.grey.dark};
  }
  &:focus {
    outline: none;
  }
`;
