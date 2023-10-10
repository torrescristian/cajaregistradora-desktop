import { useAuthState } from '@/contexts/AuthContext';
import useLogoutMutation from '@/hooks/services/useLogoutMutation';
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
