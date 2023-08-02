import { NextPageContext } from 'next';
import { parse } from 'cookie';
import IUser from '@/interfaces/IUser';

export const isAuthenticated = async (
  ctx: NextPageContext
): Promise<boolean> => {
  const cookie = ctx.req?.headers.cookie;
  const parsedCookie = cookie ? parse(cookie) : {};
  const strapi_jwt = parsedCookie.strapi_jwt;

  return !!strapi_jwt;
};

export const isOwner = (ctx: NextPageContext): boolean => {
  const cookie = ctx.req?.headers.cookie;
  const parsedCookie = cookie ? parse(cookie) : {};
  const user = JSON.parse(parsedCookie.user || '{}') as IUser;

  const roleType = user.role?.type;

  return roleType === 'owner';
};

export const getServerSideOwnerProps = async (ctx: NextPageContext) => {
  const userIsAuth = await isAuthenticated(ctx);
  const userIsOwner = await isOwner(ctx);

  try {
    // Get the JWT token from the request cookies
    if (!userIsAuth || !userIsOwner) {
      // If there is no token, the user is not logged in
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    return {
      props: {},
    };
  } catch (error) {
    console.log(
      '🚀 ~ file: auth.ts:50 ~ getServerSideOwnerProps ~ error:',
      error
    );

    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};

export const getServerSideAuthProps = async (ctx: NextPageContext) => {
  try {
    // Get the JWT token from the request cookies
    if (!(await isAuthenticated(ctx))) {
      // If there is no token, the user is not logged in
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    return {
      props: {},
    };
  } catch (error) {
    console.log(
      '🚀 ~ file: auth.ts:81 ~ getServerSideAuthProps ~ error:',
      error
    );

    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};
