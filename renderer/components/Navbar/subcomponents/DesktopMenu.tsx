import { useAuthState } from '@/contexts/AuthContext';
import { ISubMenuProps } from '@/interfaces/INavbar';
import NavButton from './NavButton';

const DesktopMenu = ({ onLogout, isLoggedIn }: ISubMenuProps) => {
  const { isOwner } = useAuthState();

  return (
    <section className="relative flex-none">
      {isLoggedIn && (
        <ul className="flex items-center space-x-4">
          <NavButton href="/productos">Ordenes</NavButton>
          <NavButton href="/ventas">Ventas</NavButton>
          {isOwner ? (
            <>
              <NavButton href="/admin/caja">Balance de Caja</NavButton>
              <NavButton href="/admin/productos">Reabastecer</NavButton>
              <NavButton href="/admin/generador-de-productos-y-variantes">
                Crear Producto
              </NavButton>
            </>
          ) : null}
          <NavButton onClick={onLogout}>Cerrar Sesión</NavButton>
        </ul>
      )}
    </section>
  );
};

export default DesktopMenu;
