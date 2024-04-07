import { twMerge } from 'tailwind-merge';
import { getCloseModal, useModalStore } from '../../contexts/useModalStore';
import { RenderIf } from '../atoms/RenderIf';

type IProps = {
  children: any;
  className?: string;
  onClose?: () => void;
  disableBackdrop?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export default function ModalTemplate({
  children,
  className,
  onClose,
  disableBackdrop,
  ...props
}: IProps) {
  const closeModal = useModalStore(getCloseModal);

  return (
    <>
      <div
        className={twMerge('modal-box w-fit max-w-[unset]', className)}
        {...props}
      >
        {children}
      </div>
      <RenderIf condition={!disableBackdrop}>
        <form method="dialog" className="modal-backdrop bg-[#0006]">
          <button onClick={onClose || closeModal}>Close</button>
        </form>
      </RenderIf>
    </>
  );
}
