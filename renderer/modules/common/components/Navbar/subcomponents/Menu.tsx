import { useAuthState } from '@/modules/common/contexts/AuthContext';
import { ISubMenuProps } from '@/modules/common/interfaces/INavbar';
import NavButton from './NavButton';
import { PhoneIcon } from '@heroicons/react/24/solid';
import useIsMobile from '@/modules/reabastecer/hooks/useIsMobile';

const Menu = ({ onLogout, isLoggedIn }: ISubMenuProps) => {
  const { isOwner } = useAuthState();
  const isMobile = useIsMobile();

  return (
    <section className="flex flex-col items-center space-x-4 menu p-4 w-80 min-h-full bg-base-200 text-base-content ">
      {isLoggedIn && (
        <ul>
          {isMobile ? (
            <ul>
              <NavButton className="w-full" href="/pedidos">
                Crear orden
              </NavButton>
              <NavButton className="w-full" href="/ordenes">
                Ordenes pendientes
              </NavButton>
            </ul>
          ) : null}
          <NavButton className="w-full" href="/recibos">
            Recibos
          </NavButton>
          <NavButton className="w-full" href="/admin/caja">
            Caja
          </NavButton>
          {isOwner ? (
            <>
              <NavButton className="w-full" href="/admin/reabastecer">
                Reabastecer
              </NavButton>

              <NavButton className="w-full" href="/admin/crearProductos">
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
          <li>
            <a
              className="w-full justify-center"
              href="https://wa.me/+5493513863151?text=Hola,%20estoy%20teniendo%20un%20problema%20con%20la%20aplicaci%C3%B3n%20Caja%20Registradora.%20Necesito%20soporte%20t%C3%A9cnico.%20%C2%BFPodr%C3%ADas%20ayudarme%3F"
              target="_blank"
            >
              <PhoneIcon className="w-6 h-6 text-success" />{' '}
              <p className="font-bold text-success">Atención al cliente</p>
            </a>
          </li>
        </ul>
      )}
    </section>
  );
};

export default Menu;
