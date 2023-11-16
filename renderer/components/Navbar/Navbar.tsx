import { NotificationsIcon } from './subcomponents/NotificationsIcon';
import { Bars3Icon } from '@heroicons/react/24/solid';
import NavButton from './subcomponents/NavButton';
import { WifiStatus } from './subcomponents/WifiStatus';
import { useAuthState } from '@/contexts/AuthContext';

export default function Navbar() {
  const { userData } = useAuthState();

  return (
    <nav>
      <section className="w-full flex flex-row justify-between ">
        <div className="flex flex-col items-center">
          <h2 className="font-bold whitespace-nowrap">Caja Registradora</h2>
          <h3 className="text-sm text-center">{userData?.username}</h3>
        </div>
        <div className="flex flex-row">
          <NotificationsIcon />
          <WifiStatus />
          <div className="flex flex-row">
            <NavButton
              className="w-min whitespace-nowrap text-secondary-focus"
              href="/pedidos"
            >
              Crear orden
            </NavButton>
            <NavButton
              className="w-min whitespace-nowrap text-secondary-focus"
              href="/ordenes"
            >
              Ordenes pendientes
            </NavButton>
          </div>
          <label
            htmlFor="menu-drawer"
            className="btn btn-secondary gap-3 drawer-button"
          >
            <Bars3Icon className="w-6 h-6" />
            <p>Menu</p>
          </label>
        </div>
      </section>
    </nav>
  );
}
