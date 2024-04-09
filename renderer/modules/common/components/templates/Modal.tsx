import { twMerge } from 'tailwind-merge';
import { useModalStore } from '../../contexts/useModalStore';

export default function Modal() {
  const { isModalOpen, Content } = useModalStore();

  return (
    <dialog
      open={isModalOpen}
      className={twMerge('modal', isModalOpen && 'open')}
    >
      {Content}
    </dialog>
  );
}
