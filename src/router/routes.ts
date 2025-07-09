import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  // Redirect from root to home page
  {
    path: '/',
    redirect: '/kabobs.id',
  },
  {
    path: '/kabobs.id',
    component: () => import('layouts/NavbarLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue') },
    ],
  },

  {
    path: '/menu',
    component: () => import('layouts/NavbarLayout.vue'), 
    children: [
      {path: '', component: () => import('pages/MenuPage.vue')},]
  },

  {
    path: '/order-now',
    component: () => import('layouts/NavbarLayout.vue'), 
    children: [
      {path: '', component: () => import('pages/OrderPage.vue')},]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
