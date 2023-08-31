import { useAuthState } from '@/contexts/AuthContext';
import { ISubMenuProps } from '@/interfaces/INavbar';
import NavButton from './NavButton';

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
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
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
