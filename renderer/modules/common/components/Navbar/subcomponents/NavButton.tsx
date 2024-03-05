import { useDrawerStore } from '@/modules/common/contexts/useDrawerStore';
import { mergeClasses } from '@/modules/common/libs/utils';
import { useRouter } from 'next/router';

export interface ILinkProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e?: React.SyntheticEvent) => void;
}

const NavButton = ({ href, children, className, onClick }: ILinkProps) => {
  const router = useRouter();
  const { closeDrawer: closeModal } = useDrawerStore();

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (onClick) {
      onClick(e);
      return;
    }

    if (!href) return;

    closeModal();
    router.push(href);
  };

  return (
    <button
      data-test={href}
      className={mergeClasses(
        'btn-ghost btn w-fit rounded-md px-4 py-2 text-right text-sm uppercase',
        className,
      )}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default NavButton;
