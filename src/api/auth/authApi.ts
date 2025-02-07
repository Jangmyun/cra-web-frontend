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

export const login = async (data: Login): Promise<ResponseLogin> => {
  try {
    const response = await AuthClient.post<ResponseLogin>('/auth/login', data);
    const { resUserDetailDto, resTokenDto } = response.data;

    sessionStorage.setItem('accessToken', resTokenDto.accessToken);
    sessionStorage.setItem('refreshToken', resTokenDto.refreshToken);
    sessionStorage.setItem('userId', resTokenDto.userId.toString());
    sessionStorage.setItem('name', resUserDetailDto.name);
    sessionStorage.setItem('email', resUserDetailDto.email);
    sessionStorage.setItem('studentId', resUserDetailDto.studentId.toString());
    sessionStorage.setItem('term', resUserDetailDto.term);
    sessionStorage.setItem('githubId', resUserDetailDto.githubId);
    sessionStorage.setItem('imgUrl', resUserDetailDto.imgUrl);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage =
        error.response.data?.message || 'Unknown error during Login';
      console.error('Login Error:', errorMessage);
      throw new Error(errorMessage);
    } else {
      console.error('Unexpected Error:', error);
      throw new Error('Unexpected Error occurred during Login');
    }
  }
};

export const signUp = async (data: ReqSignUp): Promise<ResSignUp> => {
  try {
    const response = await AuthClient.post<ResSignUp>('/auth/signup', data);
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
