import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { emailCode, emailRequest } from '~/api/account';
import HeightSpacer from '~/components/Common/HeightSpacer';
import WidthSpacer from '~/components/Common/WidthSpacer';
import AlertModal from '~/components/Modal/Alert/AlertModal';

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
    id: '',
    pw: '',
    studentNum: '',
    name: '',
    email: '',
    emailCode: '',
    CRA: '',
    github: '',
    talk: '',
    code: '',
  });
  const [isCodeRequired, setIsCodeRequired] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가

  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const sendEmailRequest = async () => {
    if (formData.email !== '') {
      alert('이메일핑');
      let resStatus = await emailRequest(formData.email);
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
  };

  const emailValidCheck = async () => {
    let resStatus = await emailCode(formData.emailCode);
    if (resStatus === 200) {
        alert("성공");
        setIsCodeRequired(false);
        setIsTimerRunning(false);
        setIsValid(true);
    } else {
        alert("error");
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    // Check if any field is empty
    // 모든 필드가 채워졌는지 확인
    for (let key in formData) {
      if (!formData[key as keyof typeof formData]) {
        // 타입 단언 추가
        setIsModalOpen(true); // 모달 열기
        return;
      }
    }

    // If all fields are filled, navigate to the next page
    setError('');
    navigate('/welcome');
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
          <label htmlFor="id">아이디</label>
          <input
            type="text"
            name="id"
            id="id"
            placeholder="아이디를 입력하세요."
            value={formData.id}
            onChange={handleChange}
          />
        </Input>
        <Input>
          <label htmlFor="pw">비밀번호</label>
          <input
            type="password"
            name="pw"
            id="pw"
            placeholder="비밀번호를 입력하세요."
            value={formData.pw}
            onChange={handleChange}
          />{' '}
        </Input>

        <Input>
          <label htmlFor="studentNum">학번</label>
          <input
            type="text"
            name="studentNum"
            id="studentNum"
            placeholder="학번을 입력하세요."
            value={formData.studentNum}
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
              readOnly={isValid || isCodeRequired}
            />{' '}
            <WidthSpacer space={6} />
            <ValidButton type="button" onClick={sendEmailRequest} disabled={isValid}>
              이메일 인증
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
                <EmailCodeReTransmit type="button" onClick={sendEmailRequest}>
                  재전송
                </EmailCodeReTransmit>
                <WidthSpacer space={6} />
                <EmailCodeButton type="button" onClick={emailValidCheck}>
                  확인
                </EmailCodeButton>
              </EmailContainer>
            </>
          )}
        </Input>

        <Input>
          <label htmlFor="CRA">CRA 기수</label>
          <input
            type="text"
            name="CRA"
            id="CRA"
            placeholder="CRA 기수를 입력하세요."
            value={formData.CRA}
            onChange={handleChange}
          />{' '}
        </Input>

        <Input>
          <label htmlFor="github">GitHub 주소</label>
          <input
            type="text"
            name="github"
            id="github"
            placeholder="GitHub 주소를 입력하세요."
            value={formData.github}
            onChange={handleChange}
          />{' '}
        </Input>

        <Input>
          <label htmlFor="talk">나의 한마디</label>
          <input
            type="text"
            name="talk"
            id="talk"
            placeholder="나의 한마디를 입력하세요."
            value={formData.talk}
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

        <SubmitBtn type="submit">확인</SubmitBtn>
      </RegisterInputForm>
      {isModalOpen && <AlertModal closeModal={() => setIsModalOpen(false)} />}
    </Container>
  );
}

export default RegisterForm;
