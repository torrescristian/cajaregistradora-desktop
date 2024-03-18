import { PlusIcon } from '@heroicons/react/24/solid';
import ActionButton, { IActionButton } from './ActionButton';

const AddProductButton = ({ onClick }: IActionButton & {}) => (
  <ActionButton
    onClick={onClick}
    className="btn-square px-2 bg-green-400 text-neutral-content hover:bg-green-600 focus:bg-green-400"
  >
    <PlusIcon className="h-5 w-5" />
  </ActionButton>
);

export default AddProductButton;
