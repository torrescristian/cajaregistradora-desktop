import strapi from '@/modules/common/libs/strapi';
import { login, useAuthDispatch } from '@/modules/common/contexts/AuthContext';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import getUserByJWT from '@/modules/common/hooks/getUserByJWT';

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

  return useMutation(async (props: IProps): Promise<void> => {
    const payload = {
      identifier: props.email,
      password: props.password,
    } as ILoginPayload;
    const { jwt } = await strapi.login(payload);
    const user = await getUserByJWT(jwt);
    dispatch(login(user));
    router.push('/pedidos');
  });
}
