import { useAuthState } from '@/modules/common/contexts/AuthContext';
import useIsMobile from '@/modules/reabastecer/hooks/useIsMobile';

export const NavbarUser = () => {
  const isMobile = useIsMobile();
  const { userData } = useAuthState();
  return (
    <div className="w-max flex flex-row items-start">
      <img src="/images/logo.png" className="w-56 sm:w-20" />
      {isMobile ? null : (
        <div className="flex flex-col w-full">
          <p className="whitespace-nowrap">Caja Registradora</p>
          <p className="text-center">{userData!.username}</p>
        </div>
      )}
    </div>
  );
};
