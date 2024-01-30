import 'react-toastify/dist/ReactToastify.css';
import CustomToastContainer from './CustomToastContainer';
import Navbar from './Navbar/Navbar';
import { useModalStore } from '../contexts/useModalStore';

interface IProps {
  children: React.ReactNode;
}
export default function GlobalLayout({ children }: IProps) {
  const { isOpen, content: Content } = useModalStore();

  return (
    <div className={'drawer drawer-end'}>
      <CustomToastContainer />
      <input
        id="menu-drawer"
        type="checkbox"
        checked={isOpen}
        className="drawer-toggle"
      />

      <div className="drawer-content">
        <section className="p-5">
          <Navbar />
          <section className="flex flex-col">{children}</section>
        </section>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="menu-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        {Content}
      </div>
    </div>
  );
}
