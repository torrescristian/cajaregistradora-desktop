import { useAuthState } from '@/modules/common/contexts/AuthContext';
import useIsMobile from '@/modules/reabastecer/hooks/useIsMobile';
import { useRouter } from 'next/router';

export const NavbarUser = () => {
  const isMobile = useIsMobile();
  const { userData } = useAuthState();
  const router = useRouter();
  return (
    <div
      className="w-max flex flex-row items-center btn-ghost select-none"
      onClick={() => router.push('/pedidos')}
    >
      <img src="/images/logo.png" className="w-36 sm:w-20" />
      {isMobile ? null : (
        <div className="flex flex-col w-fit px-4">
          <p className="whitespace-nowrap">Caja Registradora</p>
          <p className="text-center">{userData!.username}</p>
        </div>
      )}
    </div>
  );
};
