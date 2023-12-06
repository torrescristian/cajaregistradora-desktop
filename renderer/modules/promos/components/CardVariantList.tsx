import { IVariantAndQuantity } from '@/modules/promos/interfaces/IPromo';
import { formatPrice } from '@/modules/common/libs/utils';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Card } from '@/modules/common/components/Card';

interface IProps {
  selectedVariantList: IVariantAndQuantity[];
  setSelectedVariantList: (s: IVariantAndQuantity[]) => void;
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
    <div className="flex flex-row gap-4 pt-5 flex-wrap ">
      {selectedVariantList.map(({ variant, quantity }, index) => (
        <Card key={index}>
          <div className="flex flex-row justify-between items-center gap-5 p-2 w-full">
            <p className="text-xl">
              {variant.product.name} - {variant.name}{' '}
            </p>
            <button
              className="btn btn-error text-neutral-content"
              onClick={handleClickRemoveVariant(index)}
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-row items-center gap-5">
            <p>{formatPrice(variant.price)}</p>

            <button
              className="btn btn-error text-neutral-content"
              onClick={handleClickRemoveVariantQuantity(index)}
            >
              <MinusIcon className="w-5 h-5" />
            </button>
            <p className="text-xl">x{quantity}</p>
            <button
              className="btn btn-success text-neutral-content"
              onClick={incrementVariantByOne(variant.id!)}
            >
              <PlusIcon className="w-5 h-5" />
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
}
