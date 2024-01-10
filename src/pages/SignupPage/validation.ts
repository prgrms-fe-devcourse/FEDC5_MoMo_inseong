export const validateEmail = (email: string): string => {
  const emailRegex = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (email === '') {
    return '이메일을 입력해주세요.';
  } else if (!emailRegex.test(email)) {
    return '이메일 형식으로 입력해주세요.';
  } else if (email.length > 50) {
    return '40자 까지 입력 가능합니다.';
  }
  return '';
};

export const validatePassword = (password: string): string => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
  if (password === '') {
    return '비밀번호를 입력해주세요.';
  } else if (!passwordRegex.test(password)) {
    return '최소5자 이상 숫자를 포함하여 입력해주세요.';
  }
  return '';
};

export const validateConfirmPassword = (
  password: string,
  confirm: string,
): string => {
  if (confirm === '') {
    return '비밀번호를 재입력해주세요.';
  } else if (password !== confirm) {
    return '비밀번호가 동일하지 않습니다.';
  }
  return '';
};

export const validateFullName = (fullName: string): string => {
  const fullNameRegex = /^[a-zA-Z0-9가-힣]{2,10}$/;
  if (fullName === '') {
    return '닉네임을 입력해주세요.';
  } else if (!fullNameRegex.test(fullName)) {
    return '2~10자의 영문자, 숫자, 한글만 입력 해주세요.';
  }
  return '';
};
