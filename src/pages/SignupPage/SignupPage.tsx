import styled from '@emotion/styled';
import { theme } from '@/style/theme';
import { Button } from '@common/Button/Button';
import { Input } from '@common/Input/Input';

export const SignUpPage = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  // const [nickname, setNickname] = useState('');
  // const [isValid, setIsValid] = useState(false);

  // useEffect(() => {
  //   const handleValidateEmail = (email: string) =>
  //     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  //   const handleValidatePassword = (password: string) => password.length >= 6;
  //   const isPasswordMatching = password === confirmPassword;
  //   const hasNickname = nickname.trim().length > 0;

  //   setIsValid(
  //     handleValidateEmail(email) &&
  //       handleValidatePassword(password) &&
  //       isPasswordMatching &&
  //       hasNickname,
  //   );
  // }, [email, password, confirmPassword, nickname]);

  // const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setEmail(e.target.value);
  // };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  // };

  return (
    <StSignUpContainer>
      <StDescriptionContainer>LOGO TEXT</StDescriptionContainer>
      <StVerticalLine />
      <StSignUpFormContainer>
        <StFormTitle>회원가입</StFormTitle>

        <Input placeholder="이메일" />
        <Input
          placeholder="비밀번호"
          type="password"
        />
        <Input
          placeholder="비밀번호 재확인"
          type="password"
        />
        <Input placeholder="닉네임" />
        <Button label="가입" />
      </StSignUpFormContainer>
    </StSignUpContainer>
  );
};

const StSignUpContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StDescriptionContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StVerticalLine = styled.div`
  width: 1px;
  background-color: ${theme.colors.grey.light};
  height: 90%;
`;

const StSignUpFormContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: 'blue';
  gap: 25px;
`;

const StFormTitle = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
`;
