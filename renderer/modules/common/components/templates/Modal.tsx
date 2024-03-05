import { twMerge } from 'tailwind-merge';
import { useModalStore } from '../../contexts/useModalStore';
import OutsideAlerter from '../OutsideAlerter';

export default function Modal() {
  const { isModalOpen, Content, closeModal } = useModalStore();

  return (
    <OutsideAlerter callback={closeModal}>
      <dialog
        open={isModalOpen}
        className={twMerge('rounded-lg z-20 top-[25%]')}
      >
        {Content}
      </dialog>
    </OutsideAlerter>
  );
}
