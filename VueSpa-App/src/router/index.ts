import isAuthenticatedGuard from '@/modules/auth/guards/is-authenticated.guard';
import NotFound404 from '@/modules/common/pages/NotFound404.vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import HomePage from '@/modules/landing/pages/HomePage.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    //Landing
    {
      path: '/',
      name: 'panding',
      component: () => import('@/modules/landing/layouts/LandingLayout.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: HomePage,
        },
        {
          path: '/feactures',
          name: 'feactures',
          component: () => import('@/modules/landing/pages/FeacturesPages.vue'),
        },
        {
          path: '/pricing',
          name: 'pricing',
          component: () => import('@/modules/landing/pages/PricingPage.vue'),
        },
        {
          path: '/contact',
          name: 'contact',
          component: () => import('@/modules/landing/pages/ContactPage.vue'),
        },
        {
          path: '/pokemon/:id',
          name: 'pokemon',
          beforeEnter: [isAuthenticatedGuard],
          props: (route) => {
            const id = +route.params.id;
            return isNaN(id) ? { id: 1 } : { id };
          },
          component: () => import('@/modules/pokemon/pages/PokemonPage.vue'),
        },
      ],
    },

    //Auth
    {
      path: '/auth',
      redirect: { name: 'login' },
      // redirect: 'login',
      component: () => import('@/modules/auth/layouts/AuthLayout.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/modules/auth/pages/LoginPage.vue'),
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/modules/auth/pages/RegisterPage.vue'),
        },
      ],
    },

    //Not Found
    {
      path: '/:pathMatch(.*)*',
      component: NotFound404,
    },
  ],
});

export default router;