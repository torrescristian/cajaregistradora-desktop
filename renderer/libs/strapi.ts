export const TOKEN_KEY = 'strapi_jwt';

import Strapi from 'strapi-sdk-js';

const strapi = new Strapi({
  url:
    process.env.NEXT_PUBLIC_STRAPI_API_URL ||
    'https://control.cajaregistradora.app/',
  prefix: '/api',
  store: {
    key: TOKEN_KEY,
    useLocalStorage: true,
    cookieOptions: { path: '/' },
  },
  axiosOptions: {},
});

export default strapi;
