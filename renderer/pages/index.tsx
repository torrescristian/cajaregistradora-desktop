import { isAuthenticated } from '@/libs/auth';
import { NextPageContext } from 'next';

export default function Home() {}

export const getServerSideProps = async (ctx: NextPageContext) => {
  try {
    // Get the JWT token from the request cookies
    if (!(await isAuthenticated(ctx))) {
      // If there is no token, the user is not logged in
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    return {
      redirect: {
        destination: '/productos',
        permanent: false,
      },
    };
  } catch (error) {
    console.log(
      '🚀 ~ file: auth.ts:81 ~ getServerSideAuthProps ~ error:',
      error
    );

    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
};
