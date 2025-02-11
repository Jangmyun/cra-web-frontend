import axios from 'axios';
import { AuthClient } from '~/api/client.ts';
import {
  ReqSignUp,
  ResSignUp,
  ReissueToken,
  Login,
  ResTokenDto,
  ResUserDetail,
  ResponseLogin,
} from '~/models/Auth.ts';
import { authClient } from './authClient';

export const login = async (data: Login): Promise<ResponseLogin> => {
  try {
    const response = await AuthClient.post<ResponseLogin>('/auth/login', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Login Error:', error);
      throw new Error(error);
    } else {
      console.error('Unexpected Error:', error);
      throw new Error('Unexpected Error occurred during Login');
    }
  }
};

export const signUp = async (data: ReqSignUp): Promise<ResSignUp | null> => {
  try {
    const response = await AuthClient.post<ResSignUp>('/auth/signup', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('SignUp Error:', error.response.data);

      // 상태 코드에 따른 에러 메시지 처리
      let errorMessage = '회원가입에 실패했습니다.';
      if (error.response.status === 400) {
        errorMessage = '입력한 정보를 다시 확인해주세요.';
      } else if (error.response.status === 409) {
        errorMessage = '이미 존재하는 사용자입니다.';
      } else if (error.response.status === 500) {
        errorMessage = '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
      }

      return Promise.reject(new Error(errorMessage));
    } else {
      return Promise.reject(new Error('알 수 없는 오류가 발생했습니다.'));
    }
  }
};

export const reissueToken = async (
  data: ReissueToken,
): Promise<ResTokenDto> => {
  try {
    const response = await AuthClient.post<ResTokenDto>(
      '/auth/reissue-token',
      data,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('SignUp Error:', error.response.data);
      throw new Error(error.response.data?.message || 'Error during SignUp');
    } else {
      throw new Error('Unexpected Error occurred during SignUp');
    }
  }
};

export const logOut = async () => {
  try {
    await authClient.post('/auth/logout');
  } catch (error) {
    console.error('Logout API Error:', error);
    throw error;
  }
};
