import { useRouter } from 'next/router';
import useIsMobile from '@/hooks/useIsMobile';
import useLogoutMutation from '@/hooks/services/useLogoutMutation';
import { useAuthState } from '@/contexts/AuthContext';
import MobileMenu from './subcomponents/MobileMenu';
import DesktopMenu from './subcomponents/DesktopMenu';

export default function Navbar() {
  const { isLoggedIn } = useAuthState();
  const logoutMutation = useLogoutMutation();
  const router = useRouter();
  const isMobile = useIsMobile();
  const { userData } = useAuthState();

  const handleLogout = () => {
    logoutMutation.mutate();
    router.push('/');
  };

  return (
    <nav className="navbar bg-base-100 md:w-max">
      
      {/*       <section className="flex w-min flex-1 select-none flex-col flex-wrap text-xl uppercase">
        <h2 className="whitespace-nowrap text-xl font-bold">
          Caja Registradora
        </h2>
        <h3 className="text-xs font-bold">{userData?.username}</h3>
      </section>
      {isMobile ? (
        <MobileMenu onLogout={handleLogout} isLoggedIn={isLoggedIn} />
      ) : (
        <DesktopMenu onLogout={handleLogout} isLoggedIn={isLoggedIn} />
      )} */}
    </nav>
  );
}
