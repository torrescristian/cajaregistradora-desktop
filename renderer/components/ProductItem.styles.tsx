import { mergeClasses } from '@/libs/utils';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import { IActionButton, IComponent } from '@/interfaces/ProductItem.interfaces';

export const CollapseTitle = ({
  children,
  className,
  disabled,
}: IComponent) => (
  <section
    data-test="collapseTitle"
    className={mergeClasses(
      'collapse-title flex items-center p-5 text-primary-content',
      className,
      disabled ? 'bg-gray-400' : '',
    )}
  >
    {children}
  </section>
);

export const CollapseContent = ({
  children,
  className,
  disabled,
}: IComponent) => (
  <section
    data-test="collapseContent"
    className={mergeClasses(
      'collapse-content flex justify-end gap-x-2.5 pt-5 text-primary-content',
      className,
      disabled ? 'bg-gray-400' : 'bg-secondary',
    )}
  >
    {children}
  </section>
);

export const ActionButton = ({
  children,
  className,
  disabled,
  onClick,
}: IComponent & IActionButton) => (
  <button
    className={mergeClasses(
      'btn-md btn z-10 flex flex-row shadow-lg text-white btn-success w-min',
      className,
      disabled ? 'btn-disabled' : 'btn-success',
    )}
    onClick={onClick}
  >
    {children}
  </button>
);

export const Badge = ({ children, className }: IComponent) =>
  children?.toString() === '0' ? null : (
    <span
      className={mergeClasses(
        'text-2xs bg-secondary font-bold text-white',
        'flex h-8 w-12 items-center justify-center rounded-full rounded-l-full',
        className,
      )}
    >
      {children}
    </span>
  );

export const AddProductButtonWithText = ({
  onClick,
  disabled,
}: IActionButton & {
  disabled: boolean;
}) => (
  <ActionButton
    onClick={onClick}
    disabled={disabled}
    className="btn-square w-min bg-green-400 text-2xl uppercase text-stone-50 hover:bg-green-600 focus:bg-green-400"
  >
    Agregar
  </ActionButton>
);

export const AddProductButton = ({
  onClick,
  disabled,
}: IActionButton & {
  disabled: boolean;
}) => (
  <ActionButton
    onClick={onClick}
    disabled={disabled}
    className="btn-square px-2  bg-green-400 text-stone-50 hover:bg-green-600 focus:bg-green-400"
  >
    <PlusIcon className="h-8 w-8" />
  </ActionButton>
);

export const UpdateProductButton = ({
  pendingChanges,
  onClick,
}: {
  onClick: any;
  pendingChanges: boolean;
}) => (
  // TODO:  <ActionButton onClick={onClick} disabled={!pendingChanges}>
  <ActionButton onClick={onClick}>Guardar</ActionButton>
);

export const RemoveProductButton = ({ onClick }: IActionButton) => (
  <ActionButton
    onClick={onClick}
    className="btn-error btn-square px-2  bg-red-500 text-stone-50 hover:bg-red-700 focus:bg-red-500"
  >
    <MinusIcon className="h-8 w-8" />
  </ActionButton>
);

export const ClearButton = ({ onClick }: IActionButton) => (
  <ActionButton
    onClick={onClick}
    className="btn-error btn-square px-2  bg-red-500 text-stone-50 hover:bg-red-700 focus:bg-red-500"
  >
    <TrashIcon className="h-8 w-8" />
  </ActionButton>
);
