import WhatsappButton from '@/modules/common/components/WhatsappButton';
import OutsideAlerter from '@/modules/common/components/OutsideAlerter';
import { useAuthState } from '@/modules/common/contexts/AuthContext';
import { Bars3Icon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { ISubMenuProps } from '@/modules/common/interfaces/INavbar';
import NavButton from '../Navbar/subcomponents/NavButton';

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
                    <NavButton className="w-full" href="/admin/caja">
                      Balance de Caja
                    </NavButton>
                    <NavButton className="w-full" href="/admin/productos">
                      Reabastecer
                    </NavButton>
                    <NavButton
                      className="w-full"
                      href="/admin/generador-de-productos-y-variantes"
                    >
                      Crear Producto
                    </NavButton>
                  </>
                )}
                <WhatsappButton />
                <NavButton
                  className="w-full bg-red-500 text-stone-50 hover:bg-red-700"
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
