import { useAuthState } from '@/modules/common/contexts/AuthContext';
import useIsMobile from '@/modules/reabastecer/hooks/useIsMobile';

export const NavbarUser = () => {
  const { userData } = useAuthState();
  const isMobile = useIsMobile();

  return (
    <div className="w-full items-start">
      <img src="/images/logo.png" className="w-20" />
    </div>
  );
};
