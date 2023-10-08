import useIsMobile from '@/hooks/useIsMobile';
import { useAuthState } from '@/contexts/AuthContext';
import ActiveLink from '@/components/ActiveLink';
import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/solid';
import { IComponent } from '@/interfaces/ProductItem.interfaces';

const Layout = ({ children }: IComponent) => (
  <nav className="btm-nav z-20 bg-stone-200 py-4">{children}</nav>
);

const BottomNav = () => {
  const { isLoggedIn } = useAuthState();
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  if (!isLoggedIn) return null;

  return (
    <Layout>
      <ActiveLink href="/productos">
        <ClipboardDocumentListIcon />
      </ActiveLink>
      <ActiveLink href="/ventas">
        <ClipboardDocumentCheckIcon />
      </ActiveLink>
    </Layout>
  );
};

export default BottomNav;
