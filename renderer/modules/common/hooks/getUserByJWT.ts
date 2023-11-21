import strapi from '@/modules/common/libs/strapi';
import IUser from '@/modules/common/interfaces/IUser';

export default async function getUserByJWT(jwt: string) {
  return await strapi.request<IUser>('GET', '/users/me/?populate=role', {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
}
