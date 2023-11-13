import { useAuthState } from '@/contexts/AuthContext';
import { ISubMenuProps } from '@/interfaces/INavbar';
import NavButton from './subcomponents/NavButton';

export default function Navbar({ isLoggedIn }: ISubMenuProps) {
  const { userData } = useAuthState();

  return (
    <nav>
      <section className='w-full mb-3'>
            <div>
              <h2 className="font-bold whitespace-nowrap">Caja Registradora</h2>
              <h3 className="text-sm text-center">{userData?.username}</h3>
            </div>
      </section>
    </nav>
  );
}
