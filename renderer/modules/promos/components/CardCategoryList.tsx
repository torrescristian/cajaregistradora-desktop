import { ICategoryExpanded } from '@/modules/categorias/interfaces/ICategory';
import { ICategoryAndQuantity } from '@/modules/promos/interfaces/IPromo';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';

interface IProps {
  selectedCategoryList: ICategoryAndQuantity[];
  setSelectedCategoryList: (c: ICategoryAndQuantity[]) => void;
  incrementCategoryByOne: (id: number) => void;
}

export default function CardCategoryList({
  selectedCategoryList,
  setSelectedCategoryList,
  incrementCategoryByOne,
}: IProps) {
  const handleClickRemoveCategory =
    (indexToRemove: number) => (e: React.MouseEvent) => {
      e.preventDefault();
      setSelectedCategoryList(
        selectedCategoryList.filter((_, index) => index !== indexToRemove),
      );
    };

  const handleClickAddCategory =
    (category: ICategoryExpanded) => (e: React.MouseEvent) => {
      e.preventDefault();
      incrementCategoryByOne(category.id!);
    };

  const handleClickRemoveQuantity =
    (indexToRemove: number) => (e: React.MouseEvent) => {
      e.preventDefault();
      setSelectedCategoryList(
        selectedCategoryList
          .map(({ category, quantity }, index) => {
            if (index === indexToRemove) {
              return { category, quantity: quantity - 1 };
            }
            return { category, quantity };
          })
          .filter((item) => item.quantity > 0),
      );
    };

  return (
    <section className="flex flex-col sm:flex-row gap-5 p-4">
      {selectedCategoryList.map(({ category, quantity }, index) => (
        <div className="flex flex-col  border-2 p-5 gap-5 " key={index}>
          <div className="flex flex-row w-full items-center gap-5">
            <p key={category.id} className="text-xl sm:text-2xl font-bold">
              {category.name}
            </p>
            <button
              className="btn btn-error text-neutral-content"
              onClick={handleClickRemoveCategory(index)}
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-row w-full justify-evenly items-center">
            <button
              className="btn btn-success text-neutral-content"
              onClick={handleClickAddCategory(category)}
            >
              <PlusIcon className="w-5 h-5" />
            </button>
            <p className="text-xl">x{quantity}</p>
            <button
              className="btn btn-error text-neutral-content"
              onClick={handleClickRemoveQuantity(index)}
            >
              <MinusIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}
