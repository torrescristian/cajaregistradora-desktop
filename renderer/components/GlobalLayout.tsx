import 'react-toastify/dist/ReactToastify.css';
import NavButton from './Navbar/subcomponents/NavButton';
import { Bars3Icon } from '@heroicons/react/24/solid';
import useNavBar from './Navbar/useNavBar';
import { RenderIf } from './RenderIf';

interface IProps {
  children: React.ReactNode;
}
export default function GlobalLayout({ children }: IProps) {
  const { isOwner, handleLogout, isLoggedIn } = useNavBar();

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <RenderIf condition={isLoggedIn}>
        <div className="drawer-content flex flex-col items-center gap-y-5 relative">
          {/* Page content here */}
          <label
            htmlFor="my-drawer"
            className="btn btn-secondary gap-3 drawer-button absolute right-4 top-4 z-20"
          >
            <Bars3Icon className="w-6 h-6" /> Menu
          </label>
          <section className="pt-10 container">{children}</section>
        </div>
      </RenderIf>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content ">
          <NavButton className="w-full" href="/pedidos">
            Crear orden
          </NavButton>
          <NavButton className="w-full" href="/ordenes">
            Ordenes pendientes
          </NavButton>
          <NavButton className="w-full" href="/recibos">
            Recibos
          </NavButton>
          {isOwner ? (
            <>
              <NavButton className="w-full" href="/admin/caja">
                Caja
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
            onClick={handleLogout}
          >
            Cerrar Sesión
          </NavButton>
        </ul>
      </div>
    </div>
  );
}
