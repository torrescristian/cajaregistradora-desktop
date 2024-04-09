import { mergeClasses } from '@/modules/common/libs/utils';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import { IComponent } from '@/modules/common/interfaces/IComponent';
import Loader from '../../common/components/atoms/Loader';
import ActionButton, {
  IActionButton,
} from '@/modules/common/components/atoms/ActionButton';

export const RemoveProductButton = ({ onClick }: IActionButton) => (
  <ActionButton
    onClick={onClick}
    className="btn-error btn-square px-2  bg-red-500 text-neutral-content hover:bg-red-700 focus:bg-red-500"
  >
    <MinusIcon className="h-5 w-5" />
  </ActionButton>
);
