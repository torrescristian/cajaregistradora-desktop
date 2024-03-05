import { twMerge } from 'tailwind-merge';
import { getCloseModal, useModalStore } from '../../contexts/useModalStore';

interface IProps {
  children: any;
  className?: string;
  onClose?: () => void;
}

export default function ModalTemplate({
  children,
  className,
  onClose,
}: IProps) {
  const closeModal = useModalStore(getCloseModal);

  return (
    <>
      <div className={twMerge('w-fit max-w-[unset]', className)}>
        {children}
      </div>
    </>
  );
}
