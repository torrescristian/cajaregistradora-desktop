import { useAuthState } from '@/modules/common/contexts/AuthContext';
import useLogoutMutation from '@/modules/common/hooks/useLogoutMutation';
import { useRouter } from 'next/router';

export default function useNavBar() {
  const { isOwner } = useAuthState();
  const { isLoggedIn } = useAuthState();
  const logoutMutation = useLogoutMutation();
  const router = useRouter();

  const handleLogout = () => {
    logoutMutation.mutate();
    router.push('/');
  };

  return {
    isOwner,
    isLoggedIn,
    handleLogout,
  };
}
