import { Bars3Icon } from '@heroicons/react/24/solid';

import { NotificationsIcon } from './subcomponents/NotificationsIcon';
import { WifiStatus } from './subcomponents/WifiStatus';
import Menu from './subcomponents/Menu';
import { useDrawerStore } from '../../../contexts/useDrawerStore';
import useNavBar from '../../../hooks/useNavBar';
import { NavbarUser } from './subcomponents/NavbarUser';

export default function Navbar() {
  const { openDrawer } = useDrawerStore();
  const { handleLogout, isLoggedIn } = useNavBar();

  if (!isLoggedIn) {
    return <nav className="h-20 w-full block"></nav>;
  }

  return (
    <nav className="flex flex-row w-full items-center justify-between p-4">
      <NavbarUser />
      <NotificationsIcon />
      <WifiStatus />

      <label
        htmlFor="menu-drawer"
        className="btn btn-secondary drawer-button"
        onClick={() =>
          openDrawer(<Menu isLoggedIn={isLoggedIn} onLogout={handleLogout} />)
        }
      >
        <Bars3Icon className="w-5 h-5" />
        <p>Menu</p>
      </label>
    </nav>
  );
}
