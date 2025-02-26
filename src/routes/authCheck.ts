//로그인 안하면 403 페이지로 가도록 하는 로직

import { redirect } from '@tanstack/react-router';
import { useAuthStore } from '~/store/authStore';

export const requireAuth = () => {
  const { isAuthenticated } = useAuthStore.getState();
  if (!isAuthenticated) {
    return redirect({ to: '/forbidden' });
  }
};
