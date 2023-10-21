import { ICategory } from '@/interfaces/ICategory';
import { ICategoryAndQuantity } from '@/interfaces/IPromo';
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
    (category: ICategory) => (e: React.MouseEvent) => {
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
    <section className="flex gap-4 p-3">
      {selectedCategoryList.map(({ category, quantity }, index) => (
        <div className="flex flex-row  border-2 p-3 " key={index}>
          <div className="flex flex-col text-center whitespace-nowrap">
            <p key={category.id} className="text-2xl font-bold">
              {category.name}
            </p>
            <div className="flex flex-row items-center p-4 gap-4">
              <button
                className="btn btn-success"
                onClick={handleClickAddCategory(category)}
              >
                <PlusIcon className="w-5 h-5" />
              </button>
              <p className="text-xl">x{quantity}</p>
              <button
                className="btn btn-error"
                onClick={handleClickRemoveQuantity(index)}
              >
                <MinusIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
          <button
            className="btn btn-error"
            onClick={handleClickRemoveCategory(index)}
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      ))}
    </section>
  );
}
