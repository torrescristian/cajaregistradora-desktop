import { NotificationsIcon } from './subcomponents/NotificationsIcon';
import { Bars3Icon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import NavButton from './subcomponents/NavButton';
import { WifiStatus } from './subcomponents/WifiStatus';
import useIsMobile from '@/modules/reabastecer/hooks/useIsMobile';
import Menu from './subcomponents/Menu';
import { useModalStore } from '../../contexts/useModalStore';
import useNavBar from '../../hooks/useNavBar';
import { NavbarUser } from './subcomponents/NavbarUser';
import { ChangeTheme } from './ChangeTheme';

export default function Navbar() {
  const { openModal } = useModalStore();

  const isMobile = useIsMobile();
  const { handleLogout, isLoggedIn } = useNavBar();

  if (!isLoggedIn) {
    return null;
  }

  return (
    <nav>
      {isMobile ? (
        <div className="w-full flex flex-col absolute bg-base-100 z-20 left-0 top-0">
          <div className="w-full flex flex-row items-center gap-2 justify-start sticky z-80 ">
            <NavbarUser />
            <NotificationsIcon />
            <WifiStatus />
            <div className="flex flex-row w-full">
              <label
                htmlFor="menu-drawer"
                className="btn btn-secondary  drawer-button"
                onClick={() =>
                  openModal(
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
        <section className="w-full flex flex-row mb-7">
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
              className="btn btn-secondary  drawer-button"
              onClick={() =>
                openModal(
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
