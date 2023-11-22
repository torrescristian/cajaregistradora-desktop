import { useAuthState } from '@/modules/common/contexts/AuthContext';
import useIsMobile from '@/modules/reabastecer/hooks/useIsMobile';

export const NavbarUser = () => {
  const { userData } = useAuthState();
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-center whitespace-nowrap">
        {isMobile ? (
          <span className="text-sm">Caja Registradora</span>
        ) : (
          'Caja Registradora'
        )}
      </h2>
      <h3 className="text-sm text-center">{userData?.username}</h3>
    </div>
  );
};
