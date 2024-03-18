import { TrashIcon } from '@heroicons/react/24/solid';

import {
  getPromoItems,
  getRemovePromo,
  useCartStore,
} from '@/modules/cart/contexts/useCartStore';
import { formatPrice } from '@/modules/common/libs/utils';

const CartPromo = () => {
  const removeProduct = useCartStore(getRemovePromo);
  const promoItems = useCartStore(getPromoItems);

  const handleClickPromoRemove = (index: number) => () => {
    return removeProduct(index);
  };
  return (
    <section className="flex flex-row gap-5">
      {promoItems.map(({ promo, selectedVariants }, index) => (
        <div key={index} className="flex flex-col border-2 p-5 gap-3">
          <div className="flex flex-row items-center gap-4">
            <p className="text-xl">{promo.name}</p>
            <button
              className="btn btn-error text-base-content"
              onClick={handleClickPromoRemove(index)}
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="p-2">
            {selectedVariants.map((variant, index) => (
              <p className="list-item" key={index}>
                {variant.product.name} - {variant.name}{' '}
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
