import { boot } from 'quasar/wrappers';
import axios from 'axios';

const baseApi = axios.create({
  baseURL: 'http://172.40.0.14:3001/kabobsid',
});

baseApi.interceptors.request.use((config) => {
  config.headers['x-api-key'] = 'yprcT0ocUoK2mvb524XA_a_wevoH-VI5';
  return config;
});

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$baseApi = baseApi;
});

export { axios, baseApi };
