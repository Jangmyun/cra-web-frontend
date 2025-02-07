import React from 'react';
import axios from 'axios';
import { AuthClient } from '../client';
import {
  ReqSignUp,
  ResSignUp,
  ReissueToken,
  Login,
  ResponseToken,
} from '~/models/Auth';

export const login = async (data: Login): Promise<ResponseToken> => {
  try {
    const response = await AuthClient.post<ResponseToken>('/auth/login', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // 서버에서 반환한 메시지에 접근
      const errorMessage =
        error.response.data?.message || 'Unknown error during Login';
      console.error('Login Error:', errorMessage);
      throw new Error(errorMessage);
    } else {
      // 예상치 못한 오류 처리
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
): Promise<ResponseToken> => {
  try {
    const response = await AuthClient.post<ResponseToken>(
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
