import { useAuthState } from '@/contexts/AuthContext';
import { ISubMenuProps } from '@/interfaces/INavbar';
import NavButton from './NavButton';

const DesktopMenu = ({ onLogout, isLoggedIn }: ISubMenuProps) => {
  const { isOwner } = useAuthState();

  return (
    <section className="w-full flex flex-col items-center space-x-4 ">
      {isLoggedIn && (
        <ul>
          <NavButton className="w-full" href="/pedidos">
            Crear orden
          </NavButton>
          <NavButton className="w-full" href="/ordenes">
            Ordenes pendientes
          </NavButton>
          <NavButton className="w-full" href="/recibos">
            Recibos
          </NavButton>
          <NavButton className="w-full" href="/admin/caja">
            Caja
          </NavButton>
          {isOwner ? (
            <>

              <NavButton className="w-full" href="/admin/productos">
                Reabastecer
              </NavButton>

              <NavButton
                className="w-full"
                href="/admin/generador-de-productos-y-variantes"
              >
                Crear Producto
              </NavButton>

              <NavButton className="w-full" href="/admin/cupones">
                Crear cupones
              </NavButton>

              <NavButton className="w-full" href="/admin/promo">
                Crear Promos
              </NavButton>

              <NavButton className="w-full" href="/categorias">
                Crear Categorias
              </NavButton>
            </>
          ) : null}

          <NavButton
            className="w-full bg-red-800 hover:bg-red-500"
            onClick={onLogout}
          >
            Cerrar Sesión
          </NavButton>
        </ul>
      )}
    </section>
  );
};

export default DesktopMenu;
