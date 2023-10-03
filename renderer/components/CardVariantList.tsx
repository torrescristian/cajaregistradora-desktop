import { IVariantAndQuantity } from '@/interfaces/IPromo';
import { formatPrice } from '@/libs/utils';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';

interface IProps {
  selectedVariantList: IVariantAndQuantity[];
  setSelectedVariantList: (s : IVariantAndQuantity[]) => void;
}

export default function CardVariantList({
  selectedVariantList,
  setSelectedVariantList,
}: IProps) {
  const handleClickRemoveVariant =
    (indexToRemove: number) => (e: React.MouseEvent) => {
      e.preventDefault();
      setSelectedVariantList(
        selectedVariantList.filter((_, index) => index !== indexToRemove),
      );
    };

  const incrementVariantByOne =
    (variantId: number) => (e: React.MouseEvent) => {
      e.preventDefault();
      setSelectedVariantList(
        selectedVariantList.map(({ variant, quantity }) => {
          if (variant.id === variantId) {
            return { variant, quantity: quantity + 1 };
          }
          return { variant, quantity };
        }),
      );
    };
  const handleClickRemoveVariantQuantity =
    (indexToRemove: number) => (e: React.MouseEvent) => {
      e.preventDefault();
      setSelectedVariantList(
        selectedVariantList
          .map(({ variant, quantity }, index) => {
            if (index === indexToRemove) {
              return { variant, quantity: quantity - 1 };
            }
            return { variant, quantity };
          })
          .filter((item) => item.quantity > 0),
      );
    };

  return (
    <div className="flex flex-row gap-5 overflow-x-scroll w-[80vw] ">
      {selectedVariantList.map(({ variant, quantity }, index) => (
        <div className="flex flex-col gap-3 items-center p-3 border-2 ">
          <div className="flex flex-row justify-between gap-3 w-full items-center">
            <p className="text-xl">
              {variant.name} {formatPrice(variant.price)}
            </p>
            <button
              className="btn btn-error"
              onClick={handleClickRemoveVariant(index)}
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-row items-center p-4 gap-4">
            <button
              className="btn btn-success"
              onClick={incrementVariantByOne(variant.id!)}
            >
              <PlusIcon className="w-5 h-5" />
            </button>
            <p className="text-xl">x{quantity}</p>
            <button
              className="btn btn-error"
              onClick={handleClickRemoveVariantQuantity(index)}
            >
              <MinusIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
