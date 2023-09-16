import { useAuthState } from '@/contexts/AuthContext';
import { ISubMenuProps } from '@/interfaces/INavbar';
import NavButton from './NavButton';
import { Bars3Icon } from '@heroicons/react/24/solid';

const DesktopMenu = ({ onLogout, isLoggedIn }: ISubMenuProps) => {
  const { isOwner } = useAuthState();

  return (
    <section className="relative flex-none">
      {isLoggedIn && (
        <ul className="flex items-center space-x-4">
          <NavButton href="/pedidos">Crear orden</NavButton>
          <NavButton href="/ordenes">Ordenes pendientes</NavButton>
          <NavButton href="/ventas">Recibos</NavButton>
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost">
              <Bars3Icon className="w-6 h-6" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {isOwner ? (
                <>
                  <li>
                    <NavButton href="/admin/caja">Caja</NavButton>
                  </li>
                  <li>
                    <NavButton href="/admin/productos">Reabastecer</NavButton>
                  </li>
                  <li>
                    <NavButton href="/admin/generador-de-productos-y-variantes">
                      Crear Producto
                    </NavButton>
                  </li>
                  <li>
                    <NavButton href="/admin/cupones">Crear cupones</NavButton>
                  </li>
                </>
              ) : null}
              <li>
                <NavButton onClick={onLogout}>Cerrar Sesión</NavButton>
              </li>
            </ul>
          </div>
        </ul>
      )}
    </section>
  );
};

export default DesktopMenu;
