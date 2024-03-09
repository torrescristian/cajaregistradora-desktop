import { NotificationsIcon } from './subcomponents/NotificationsIcon';
import { Bars3Icon } from '@heroicons/react/24/solid';
import NavButton from './subcomponents/NavButton';
import { WifiStatus } from './subcomponents/WifiStatus';
import useIsMobile from '@/modules/reabastecer/hooks/useIsMobile';
import Menu from './subcomponents/Menu';
import { useDrawerStore } from '../../contexts/useDrawerStore';
import useNavBar from '../../hooks/useNavBar';
import { NavbarUser } from './subcomponents/NavbarUser';

export default function Navbar() {
  const { openDrawer } = useDrawerStore();

  const isMobile = useIsMobile();
  const { handleLogout, isLoggedIn } = useNavBar();

  if (!isLoggedIn) {
    return null;
  }

  return (
    <nav>
      <section className="w-full flex flex-row p-4">
        <div className="flex flex-row w-full items-center justify-between">
          <NavbarUser />
          <NotificationsIcon />
          <WifiStatus />

          <div className="flex flex-row">
            <NavButton
              className="w-min whitespace-nowrap text-secondary-focus"
              href="/pedidos"
            >
              Pedidos
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
            className="btn btn-secondary drawer-button"
            onClick={() =>
              openDrawer(
                <Menu isLoggedIn={isLoggedIn} onLogout={handleLogout} />,
              )
            }
          >
            <Bars3Icon className="w-5 h-5" />
            <p>Menu</p>
          </label>
        </div>
      </section>
    </nav>
  );
}
