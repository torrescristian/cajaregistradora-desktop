import { PencilIcon } from '@heroicons/react/24/solid';
import { TrashIcon } from '@heroicons/react/24/solid';

export function EditAndDeleteButtons() {
  return (
    <div className="flex items-center justify-center gap-3 mt-5">
      <button type="button" className="border rounded p-2">
        <PencilIcon className="w-4 h-4 " />
      </button>
      <button
        type="button"
        className="border rounded border-red-800 text-red-800 p-2"
      >
        <TrashIcon className="w-4 h-4 " />
      </button>
    </div>
  );
}
