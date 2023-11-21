import strapi from '@/modules/common/libs/strapi';
import { logout, useAuthDispatch } from '@/modules/common/contexts/AuthContext';
import { USER_KEY, CART_KEY } from '@/modules/common/libs/localStorageManager';
import { useMutation } from '@tanstack/react-query';
import Cookie from 'js-cookie';

export default function useLogoutMutation() {
  const dispatch = useAuthDispatch();

  const { mutate, isSuccess, isLoading } = useMutation(
    async (): Promise<void> => {
      Cookie.remove(USER_KEY);
      Cookie.remove(CART_KEY);

      await strapi.logout();

      dispatch(logout());
    },
    {
      onSuccess: () => { },
    },
  );

  return { mutate, isSuccess, isLoading };
}
