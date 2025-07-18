import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  // Redirect from root to home page
  {
    path: '/',
    redirect: '/Kabobs.id',
  },
  {
    path: '/Kabobs.id',
    component: () => import('layouts/NavbarLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue') },
    ],
  },

  {
    path: '/Menu',
    component: () => import('layouts/NavbarLayout.vue'), 
    children: [
      {path: '', component: () => import('pages/MenuPage.vue')},]
  },

  {
    path: '/Order-now',
    component: () => import('layouts/NavbarLayout.vue'), 
    children: [
      {path: '', component: () => import('pages/OrderPage.vue')},]
  },

  {
    path: '/FAQ',
    component: () => import('layouts/NavbarLayout.vue'),
    children: [
      {path: '', component: () => import('pages/FAQPage.vue')},]
  },

  {
    path: '/Karier',
    component: () => import('layouts/NavbarLayout.vue'),
    children: [
      {path: '', component: () => import('pages/KarierPage.vue')},]
  },

  {
    path: '/Lokasi',
    component: () => import('layouts/NavbarLayout.vue'),
    children: [
      {path: '', component: () => import('pages/LokasiPage.vue')},]
  },

  {
    path: '/Promo',
    component: () => import('layouts/NavbarLayout.vue'),
    children: [
      {path: '', component: () => import('pages/PromoPage.vue')},]
  },

  {
    path: '/ContactUs',
    component: () => import('layouts/NavbarLayout.vue'),
    children: [
      {path: '', component: () => import('pages/ContactUsPage.vue')},]
  },

  {
    path: '/AboutUs',
    component: () => import('layouts/NavbarLayout.vue'),
    children: [
      {path: '', component: () => import('pages/TentangKamiPage.vue')},]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
