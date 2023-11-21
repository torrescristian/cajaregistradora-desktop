import 'react-toastify/dist/ReactToastify.css';

import { RenderIf } from './RenderIf';

import CustomToastContainer from './CustomToastContainer';
import useNavBar from '../hooks/useNavBar';
import Navbar from './Navbar/Navbar';
import Menu from './Navbar/subcomponents/Menu';

interface IProps {
  children: React.ReactNode;
}
export default function GlobalLayout({ children }: IProps) {
  const { handleLogout, isLoggedIn } = useNavBar();
  return (
    <div className="drawer drawer-end">
      <CustomToastContainer />
      <input id="menu-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content p-5">
        <RenderIf condition={isLoggedIn}>
          <Navbar />
        </RenderIf>
        <section className="flex flex-col container">{children}</section>
      </div>
      <Menu isLoggedIn={isLoggedIn} onLogout={handleLogout} />
    </div>
  );
}
