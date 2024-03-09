import 'react-toastify/dist/ReactToastify.css';
import CustomToastContainer from './CustomToastContainer';
import Navbar from './Navbar/Navbar';
import { useDrawerStore } from '../contexts/useDrawerStore';
import Modal from './templates/Modal';

interface IProps {
  children: React.ReactNode;
}
export default function GlobalLayout({ children }: IProps) {
  const { isDrawerOpen, content: Content, closeDrawer } = useDrawerStore();

  return (
    <div className={'drawer drawer-end'}>
      <CustomToastContainer />
      <input
        id="menu-drawer"
        type="checkbox"
        checked={isDrawerOpen}
        className="drawer-toggle"
        readOnly
      />

      <div className="drawer-content">
        <Modal />
        <section>
          <Navbar />
          <section className="flex flex-col">{children}</section>
        </section>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="menu-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
          onClick={closeDrawer}
        ></label>
        {Content}
      </div>
    </div>
  );
}
