import Strapi from 'strapi-sdk-js';
import { getStrapiUrl } from './utils';

export const TOKEN_KEY = 'strapi_jwt';

const strapi = new Strapi({
  url: getStrapiUrl(),
  prefix: '/api',
  store: {
    key: TOKEN_KEY,
    useLocalStorage: true,
    cookieOptions: { path: '/' },
  },
  axiosOptions: {},
});

export default strapi;
