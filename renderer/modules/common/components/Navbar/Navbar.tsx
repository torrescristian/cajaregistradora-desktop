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
      {isMobile ? (
        <div className="w-full flex flex-col absolute bg-base-100 left-0 top-0 z-30">
          <div className="w-full flex flex-row items-center gap-2 justify-between sticky px-8 py-3">
            <NavbarUser />
            <NotificationsIcon />
            <WifiStatus />
            <div className="flex flex-row">
              <label
                htmlFor="menu-drawer"
                className="btn btn-secondary w-full drawer-button flex flex-row flex-nowrap"
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
          </div>
        </div>
      ) : (
        <section className="w-full flex flex-row">
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
      )}
    </nav>
  );
}
