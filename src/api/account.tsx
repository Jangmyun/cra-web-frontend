import { client } from './client';

interface FindUsernameParams {
  studentId: string;
  name: string;
  email: string;
}
// email 인증 요청
export const emailRequest = async (email: String): Promise<number> => {
  const response = await client.post<void>(
    `/account/valid/email-request?email=${email}`,
  );
  return response.status;
};

// email 인증
export const emailCode = async (emailCode: String): Promise<number> => {
  const response = await client.post<void>(
    `/account/valid/email-code?code=${emailCode}`,
  );
  return response.status;
};

// PW 재설정 인증 요청
export const pwEmailRequest = async (username: String): Promise<number> => {
  const response = await client.post<void>(
    `/account/password-change?username=${username}`,
  );
  return response.status;
};

// ID 찾기 요청
export const findId = async (params: FindUsernameParams): Promise<string> => {
  try {
    const response = await client({
      method: 'get',
      url: '/account/find/username',
      params: {
        name: params.name,
        email: params.email,
        studentId: params.studentId,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Find ID API Error:', error);
    throw error;
  }
};
