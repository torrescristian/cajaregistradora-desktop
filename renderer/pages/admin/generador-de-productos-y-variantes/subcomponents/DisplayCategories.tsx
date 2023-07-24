import { ICategoryUI } from '@/hooks/useCategories';
import { TrashIcon } from '@heroicons/react/24/solid';

interface IDisplayCategoriesProps {
  categories: ICategoryUI[];
  handleChangeRemoveCategory: (id: number) => () => void;
}

const DisplayCategories = ({
  categories,
  handleChangeRemoveCategory,
}: IDisplayCategoriesProps) => {
  return (
    <div className="flex flex-row">
      {(categories || []).map((c) => (
        <button
          key={c.id}
          className="btn-outline btn m-3"
          onClick={handleChangeRemoveCategory(c.id)}
        >
          <TrashIcon className="btn-outline h-6 w-6 text-red-500" /> {c.name}
        </button>
      ))}
    </div>
  );
};

export default DisplayCategories;
