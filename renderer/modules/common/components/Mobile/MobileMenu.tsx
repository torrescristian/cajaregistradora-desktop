import WhatsappButton from '@/modules/common/components/WhatsappButton';
import OutsideAlerter from '@/modules/common/components/OutsideAlerter';
import { useAuthState } from '@/modules/common/contexts/AuthContext';
import { Bars3Icon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { ISubMenuProps } from '@/modules/common/interfaces/INavbar';
import NavButton from '../Navbar/subcomponents/NavButton';
import { CAJA_URL, CREAR_PRODUCTOS_URL, REABASTECER_URL } from '../../consts';

const MobileMenu = ({ isLoggedIn, onLogout }: ISubMenuProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { isOwner } = useAuthState();

  const handleLogout = () => {
    setMenuOpen(false);

    onLogout();
  };

  return (
    <section className="flex-none w-max">
      <OutsideAlerter callback={() => setMenuOpen(false)}>
        <button
          className="btn-ghost btn-square btn"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <Bars3Icon className="h-10 w-10" />
        </button>
        {menuOpen && (
          <div className="absolute left-2.5 top-14 z-30 rounded-md bg-white shadow-lg">
            {isLoggedIn && (
              <ul className="flex flex-col">
                {isOwner && (
                  <>
                    <NavButton className="w-full" href={CAJA_URL}>
                      Balance de Caja
                    </NavButton>
                    <NavButton className="w-full" href={REABASTECER_URL}>
                      Reabastecer
                    </NavButton>
                    <NavButton className="w-full" href={CREAR_PRODUCTOS_URL}>
                      Crear Producto
                    </NavButton>
                  </>
                )}
                <WhatsappButton />
                <NavButton
                  className="w-full bg-red-500 text-base-content hover:bg-red-700"
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </NavButton>
              </ul>
            )}
          </div>
        )}
      </OutsideAlerter>
    </section>
  );
};

export default MobileMenu;
