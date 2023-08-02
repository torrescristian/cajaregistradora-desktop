import strapi from '@/libs/strapi';
import { login, useAuthDispatch } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import getUserByJWT from './getUserByJWT';

interface ILoginPayload {
  identifier: string;
  password: string;
}

interface IProps {
  email: string;
  password: string;
}

export default function useLoginMutation() {
  const router = useRouter();
  const dispatch = useAuthDispatch();

  const { mutate, isSuccess, isLoading } = useMutation(
    async (props: IProps): Promise<void> => {
      const payload = {
        identifier: props.email,
        password: props.password,
      } as ILoginPayload;
      const { jwt } = await strapi.login(payload);

      const user = await getUserByJWT(jwt);

      dispatch(login(user));

      router.push('/productos');
    },
    {
      onSuccess: () => {},
    },
  );

  return { mutate, isSuccess, isLoading };
}
