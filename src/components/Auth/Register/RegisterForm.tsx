import React, { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { emailCode, emailRequest } from '~/api/account';
import { signUp } from '~/api/auth/authApi';
import HeightSpacer from '~/components/Common/HeightSpacer';
import CryptoJS from 'crypto-js';
import WidthSpacer from '~/components/Common/WidthSpacer';
import AlertModal from '~/components/Modal/Alert/AlertModal';
import { ReqSignUp } from '~/models/Auth';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1600px;
  margin-bottom: 4rem;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const Title = styled.h2`
  text-align: center;
  font-size: 40px;
  line-height: 59px;
  margin-bottom: 70px;
  color: var(--color-bright-text);
  @media (max-width: 768px) {
    margin-bottom: 3rem;
  }
`;

const RegisterInputForm = styled.form`
  font-size: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  max-width: 600px;
  background-color: var(--color-white);
  border-radius: 1rem;
  padding: 4rem 2rem;

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }

  button {
    background-color: var(--color-primary);
    color: var(--color-white);
    max-width: 400px;
    font-family: 'Pretendard Bold';
    font-size: 1.25rem;
    text-align: center;
    padding: 0.9rem 0;
    border: none;
    border-radius: 0.75rem;
    cursor: pointer;
  }
`;

const Input = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 2rem;

  label {
    color: var(--color-dark);
    font-family: 'Pretendard SemiBold';
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
    user-select: none;
  }

  input {
    background-color: var(--color-white);
    color: var(--color-dark-text);
    font-size: 1.25rem;
    border: 1px solid var(--color-dark-stroke);
    border-radius: 0.5rem;
    padding: 1.5rem 1rem;
    box-sizing: border-box;
    height: 66px;
    flex: 1;

    @media (max-width: 480px) {
      padding: 1.2rem 0.8rem;
    }
  }

  input:read-only {
    background-color: var(--color-background);
  }
`;

const EmailInput = styled.div`
  background-color: var(--color-white);
  color: var(--color-dark-text);
  font-size: 1.25rem;
  border: 1px solid var(--color-dark-stroke);
  border-radius: 0.5rem;
  box-sizing: border-box;
  height: 66px;
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 1rem;

  input {
    background-color: transparent;
    height: 100%;
    border: none;
  }
`;

const EmailContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ValidButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 66px;
  width: 20%;

  &:disabled {
    background-color: gray;
    cursor: default;
    opacity: 0.6;
  }
`;

const EmailCodeReTransmit = styled.button`
  background-color: var(--color-secondary-button) !important;
  height: 66px;
  width: 17%;
`;

const EmailCodeButton = styled.button`
  height: 66px;
  width: 20%;
`;

const SubmitBtn = styled.button`
  width: 20%;
  margin-top: 2rem;
`;

const EMAIL_VERIFICATION_TIME = 300;

function RegisterForm() {
  const navigate = useNavigate();

  // State for storing input values
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    studentId: '',
    name: '',
    email: '',
    emailCode: '',
    term: '',
    githubId: '',
    code: '',
  });

  const [emailLoading, setEmailLoading] = useState(false);
  const [emailCodeLoading, setEmailCodeLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [isCodeRequired, setIsCodeRequired] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가

  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const sendEmailRequest = async () => {
    if (emailLoading) return;
    setEmailLoading(true);
    if (formData.email !== '') {
      alert('이메일핑');
      const resStatus = await emailRequest(formData.email);
      if (resStatus === 200) {
        setIsCodeRequired(true);
        setTimeLeft(EMAIL_VERIFICATION_TIME);
        setIsTimerRunning(true);
      } else {
        alert('에러 발생 근데 뭔지는 모름');
      }
    } else {
      alert('이메일 입력해라');
    }
    setEmailLoading(false);
  };

  const emailValidCheck = async () => {
    if (emailCodeLoading) return;
    setEmailCodeLoading(true);
    const resStatus = await emailCode(formData.emailCode);
    if (resStatus === 200) {
      alert('성공');
      setIsCodeRequired(false);
      setIsTimerRunning(false);
      setIsValid(true);
    } else {
      alert('error');
    }
    setEmailCodeLoading(false);
  };

  const emailRetransmit = () => {
    setIsCodeRequired(false);
    setIsTimerRunning(false);
    setIsValid(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (submitLoading) return;
    setSubmitLoading(true);

    // Check if any field is empty
    // 모든 필드가 채워졌는지 확인
    for (const key in formData) {
      if (!formData[key as keyof typeof formData]) {
        // 타입 단언 추가
        setIsModalOpen(true); // 모달 열기
        return;
      }
    }

    const secretKey: string = import.meta.env.VITE_SECRET_KEY as string;
    const iv = CryptoJS.enc.Utf8.parse(
      import.meta.env.VITE_SECRET_IV as string,
    );
    const encryptedPassword = CryptoJS.AES.encrypt(
      formData.password,
      CryptoJS.enc.Utf8.parse(secretKey),
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      },
    ).toString();

    setError('');
    const requestBody: ReqSignUp = {
      ...formData,
      password: encryptedPassword,
      studentId: parseInt(formData.studentId),
    };

    try {
      await signUp(requestBody);
      alert('회원가입이 완료되었습니다.');
      await navigate('/welcome');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message); // UI에서 에러 메시지를 표시하도록 설정
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    if (timeLeft > 0 && isTimerRunning) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
    }
  }, [timeLeft, isTimerRunning]);

  // 남은 시간을 MM:SS 형식으로 변환
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <Container>
      <Title>회원가입</Title>
      <RegisterInputForm onSubmit={handleSubmit}>
        <Input>
          <label htmlFor="username">아이디</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="아이디를 입력하세요."
            value={formData.username}
            onChange={handleChange}
          />
        </Input>
        <Input>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="비밀번호를 입력하세요."
            value={formData.password}
            onChange={handleChange}
          />{' '}
        </Input>

        <Input>
          <label htmlFor="studentId">학번</label>
          <input
            type="text"
            name="studentId"
            id="studentId"
            placeholder="학번을 입력하세요."
            value={formData.studentId}
            onChange={handleChange}
          />{' '}
        </Input>

        <Input>
          <label htmlFor="name">이름</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="이름을 입력하세요."
            value={formData.name}
            onChange={handleChange}
          />{' '}
        </Input>

        <Input>
          <label htmlFor="name">E-mail</label>
          <EmailContainer>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="E-mail을 입력하세요."
              value={formData.email}
              onChange={handleChange}
              readOnly={
                isValid || isCodeRequired || emailLoading || emailCodeLoading
              }
            />{' '}
            <WidthSpacer space={6} />
            <ValidButton
              type="button"
              onClick={sendEmailRequest}
              disabled={isValid}
            >
              {emailLoading ? (
                <ClipLoader size={25} color="#fff" />
              ) : (
                '이메일 인증'
              )}
            </ValidButton>
          </EmailContainer>
          {isCodeRequired && (
            <>
              <HeightSpacer space={6} />
              <EmailContainer>
                <EmailInput>
                  <input
                    type="text"
                    name="emailCode"
                    id="emailCode"
                    placeholder="인증코드를 입력하세요."
                    value={formData.emailCode}
                    onChange={handleChange}
                    readOnly={isValid}
                  />
                  <WidthSpacer space={30} />
                  <div>{formatTime(timeLeft)}</div>
                </EmailInput>
                <WidthSpacer space={6} />
                <EmailCodeReTransmit type="button" onClick={emailRetransmit}>
                  재전송
                </EmailCodeReTransmit>
                <WidthSpacer space={6} />
                <EmailCodeButton type="button" onClick={emailValidCheck}>
                  {emailCodeLoading ? (
                    <ClipLoader size={25} color="#fff" />
                  ) : (
                    '확인'
                  )}
                </EmailCodeButton>
              </EmailContainer>
            </>
          )}
        </Input>

        <Input>
          <label htmlFor="term">CRA 기수</label>
          <input
            type="text"
            name="term"
            id="term"
            placeholder="CRA 기수를 입력하세요."
            value={formData.term}
            onChange={handleChange}
          />{' '}
        </Input>

        <Input>
          <label htmlFor="githubId">GitHub 주소</label>
          <input
            type="text"
            name="githubId"
            id="githubId"
            placeholder="GitHub 주소를 입력하세요."
            value={formData.githubId}
            onChange={handleChange}
          />{' '}
        </Input>

        <Input>
          <label htmlFor="code">가입코드</label>
          <input
            type="text"
            name="code"
            id="code"
            placeholder="가입코드를 입력하세요."
            value={formData.code}
            onChange={handleChange}
          />{' '}
        </Input>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <SubmitBtn type="submit">
          {submitLoading ? <ClipLoader size={25} color="#fff" /> : '확인'}
        </SubmitBtn>
      </RegisterInputForm>
      {isModalOpen && <AlertModal closeModal={() => setIsModalOpen(false)} />}
    </Container>
  );
}

export default RegisterForm;
