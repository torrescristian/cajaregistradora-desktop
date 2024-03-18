import { IComponent } from '../../interfaces/IComponent';
import { mergeClasses } from '../../libs/utils';

export interface IActionButton {
  onClick: () => void;
}

const ActionButton = ({
  children,
  className,
  disabled,
  onClick,
}: IComponent & IActionButton) => (
  <button
    className={mergeClasses(
      'btn-md btn flex flex-row shadow-lg text-white btn-success w-min',
      className,
      disabled ? 'btn-disabled' : 'btn-success',
    )}
    onClick={onClick}
  >
    {children}
  </button>
);

export default ActionButton;
