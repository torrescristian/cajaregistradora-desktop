import { getRemovePromo, useCartStore } from '@/contexts/CartStore';
import { IPromoItem } from '@/interfaces/ICart';
import { formatPrice } from '@/libs/utils';
import { TrashIcon } from '@heroicons/react/24/solid';

interface IProps {
  promosItems: IPromoItem[];
}

const CartPromo = ({ promosItems }: IProps) => {
  const removeProduct = useCartStore(getRemovePromo);

  const handleClickPromoRemove = (index: number) => () => {
    return removeProduct(index);
  };
  return (
    <section className="flex flex-row gap-5">
      {promosItems.map(({ promo, selectedVariants }, index) => (
        <div key={promo.id!} className="flex flex-col border-2 p-5 gap-3">
          <div className="flex flex-row items-center gap-4">
            <p className="text-xl">{promo.name}</p>
            <button
              className="btn btn-error text-neutral-content"
              onClick={handleClickPromoRemove(index)}
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
          {promo.categories.map(({ category, quantity }) => (
            <div className="flex flex-col p-2" key={category.id!}>
              <p className="list-item">
                {category.name}{' '}
                <span className="badge-primary badge-outline">x{quantity}</span>
              </p>
            </div>
          ))}
          <div className="p-2">
            {promo.variants.map(({ variant, quantity }) => (
              <p className="list-item">
                {variant.product} - {variant.name}{' '}
                <span className="badge-primary badge-outline">x{quantity}</span>
              </p>
            ))}
          </div>
          <p>{formatPrice(promo.price)}</p>
        </div>
      ))}
    </section>
  );
};

export default CartPromo;
