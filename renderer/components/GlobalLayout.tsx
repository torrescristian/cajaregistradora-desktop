import 'react-toastify/dist/ReactToastify.css';
import NavButton from './Navbar/subcomponents/NavButton';
import { Bars3Icon, BellAlertIcon } from '@heroicons/react/24/solid';
import useNavBar from './Navbar/useNavBar';
import { RenderIf } from './RenderIf';
import { useAuthState } from '@/contexts/AuthContext';

interface IProps {
  children: React.ReactNode;
}
export default function GlobalLayout({ children }: IProps) {
  const { isOwner, handleLogout, isLoggedIn } = useNavBar();
  const { userData } = useAuthState();


  return (
    <div className="drawer drawer-end">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center relative">
        <RenderIf condition={isLoggedIn}>
          <div className='flex flex-row w-full justify-between container mt-3'>
            <section className="flex select-none w-min flex-col items-start flex-wrap text-xl uppercase">
              <h2 className="whitespace-nowrap text-xl font-bold">
                Caja Registradora
              </h2>
              <h3 className="text-xs font-bold">{userData?.username}</h3>
            </section>
            <div className='flex flex-row gap-5'>
              <div className="indicator">
                <span className="indicator-item badge badge-error">1</span>
                <button className="btn btn-secondary"> <BellAlertIcon className="w-6 h-6" /></button>
              </div>
              <label
                htmlFor="my-drawer"
                className="btn btn-secondary gap-3 drawer-button"
              >
                <Bars3Icon className="w-6 h-6" /> Menu
              </label>
            </div>
          </div>
        </RenderIf>
        <section className="flex flex-col pt-10 container">
          {children}
        </section>
      </div>
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
