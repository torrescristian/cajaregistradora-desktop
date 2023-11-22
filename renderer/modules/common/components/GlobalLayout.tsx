import 'react-toastify/dist/ReactToastify.css';

import { RenderIf } from './RenderIf';

import CustomToastContainer from './CustomToastContainer';
import useNavBar from '../hooks/useNavBar';
import Navbar from './Navbar/Navbar';
import Menu from './Navbar/subcomponents/Menu';
import { CartDrawer } from './CartDrawer';
import useIsMobile from '@/modules/reabastecer/hooks/useIsMobile';
import { useState } from 'react';
import { useModalStore } from '../contexts/useModalStore';

interface IProps {
  children: React.ReactNode;
}
export default function GlobalLayout({ children }: IProps) {

  const isMobile = useIsMobile();

  const { isOpen, content: Content, closeModal } = useModalStore();


  return (
    <div className="drawer drawer-end">
      <CustomToastContainer />
      <input id="menu-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
      <section className=' p-5'>
          <Navbar />
          <section className="flex flex-col container">
            {children}
          </section>
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
