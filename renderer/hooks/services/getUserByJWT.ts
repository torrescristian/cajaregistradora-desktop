import strapi from '@/libs/strapi';
import IUser from '@/interfaces/IUser';

export default async function getUserByJWT(jwt: string) {
  return await strapi.request<IUser>('GET', '/users/me/?populate=role', {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
}
