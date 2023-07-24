export const TOKEN_KEY = 'strapi_jwt';

import Strapi from 'strapi-sdk-js';

const strapi = new Strapi({
  url: process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337',
  prefix: '/api',
  store: {
    key: TOKEN_KEY,
    useLocalStorage: false,
    cookieOptions: { path: '/' },
  },
  axiosOptions: {},
});

export default strapi;
