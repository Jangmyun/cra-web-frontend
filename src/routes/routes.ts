import { createRouter } from '@tanstack/react-router';
import { rootRoute } from './__root.tsx';
import { HomeRoute, introRoute } from './introRoutes.ts';
import { recruitRoute } from './recruitRoute.ts';
import { comingSoonRoute } from './tempRoutes.ts';

export const routes = createRouter({
  routeTree: rootRoute.addChildren([
    HomeRoute,
    introRoute,
    recruitRoute,
    comingSoonRoute,
  ]),
});
