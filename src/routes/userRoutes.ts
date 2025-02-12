import { createRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { rootRoute } from './__root';

export const userInfoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/user/$name',
  component: lazy(() => import('~/pages/User/Info/UserInfoPage.tsx')),
});

export const userEditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/user/$name/edit',
  component: lazy(() => import('~/pages/User/Edit/UserEditPage.tsx')),
});

export const userDeleteRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'user/$name/delete',
  component: lazy(() => import('~/pages/User/Delete/UserDeletePage.tsx')),
});

export const userImageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'user/$name/image/upload',
  component: lazy(
    () => import('~/pages/User/ImageUpload/UserImageUploadPage.tsx'),
  ),
});
