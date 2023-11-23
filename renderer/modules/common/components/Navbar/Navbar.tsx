import { NotificationsIcon } from './subcomponents/NotificationsIcon';
import { Bars3Icon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import NavButton from './subcomponents/NavButton';
import { WifiStatus } from './subcomponents/WifiStatus';
import useIsMobile from '@/modules/reabastecer/hooks/useIsMobile';
import Menu from './subcomponents/Menu';
import { useModalStore } from '../../contexts/useModalStore';
import useNavBar from '../../hooks/useNavBar';
import { NavbarUser } from './subcomponents/NavbarUser';

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
        <div className="w-full flex flex-col">
          <div className="w-full flex flex-row">
            <NavbarUser />
            <NotificationsIcon />
            <WifiStatus />
            <div className="flex flex-row w-full">
              <label
                htmlFor="menu-drawer"
                className="btn btn-secondary gap-2 drawer-button"
                onClick={() =>
                  openModal(
                    <Menu isLoggedIn={isLoggedIn} onLogout={handleLogout} />,
                  )
                }
              >
                <Bars3Icon className="w-6 h-6" />
                <p>Menu</p>
              </label>
            </div>
          </div>
        </div>
      ) : (
        <section className="w-full flex flex-row justify-between ">
          <div className="flex flex-row">
            <NavbarUser />
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
      )}
    </nav>
  );
}
