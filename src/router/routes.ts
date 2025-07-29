import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/NavbarLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue') },
      { path: 'Menu', component: () => import('pages/MenuPage.vue') },
      { path: 'Order-now', component: () => import('pages/OrderPage.vue') },
      { path: 'FAQ', component: () => import('pages/FAQPage.vue') },
      { path: 'Karier', component: () => import('pages/KarierPage.vue') },
      { path: 'Lokasi', component: () => import('pages/LokasiPage.vue') },
      { path: 'Promo', component: () => import('pages/PromoPage.vue') },
      { path: 'ContactUs', component: () => import('pages/ContactUsPage.vue') },
      { path: 'AboutUs', component: () => import('pages/TentangKamiPage.vue') },
      { path: 'Cara-Order', component: () => import('pages/CaraOrderPage.vue') },

      { 
        path: 'Karier/:id',
        name: 'KarierDetail', 
        component: () => import('pages/DetailKarierPage.vue'),
        props: true 
      },

      { 
        path: 'Apply/:positionId?', 
        name: 'ApplyNow',
        component: () => import('pages/ApplyNowPage.vue') 
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;