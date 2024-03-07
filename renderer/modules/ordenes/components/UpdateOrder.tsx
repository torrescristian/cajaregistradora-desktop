import { getSetCart, useCartStore } from '@/modules/cart/contexts/useCartStore';
import { IOrder } from '@/modules/ordenes/interfaces/IOrder';
import { useEffect } from 'react';
import { adaptOrderItemToCartItem } from '../utils/utils';
import { ProductsCatalog } from '@/modules/products/components/ProductsCatalog';

interface IProps {
  order: IOrder;
  onSubmit: () => void;
  closeUpdateMode: () => void;
}

export const UpdateOrder = ({ order, onSubmit, closeUpdateMode }: IProps) => {
  const setCart = useCartStore(getSetCart);

  useEffect(() => {
    setCart({
      clientId: order.client?.id!,
      additionalDetails: order.additionalDetails,
      totalPrice: order.totalPrice,
      subtotalPrice: order.subtotalPrice,
      cartItems: order.items.map(adaptOrderItemToCartItem),
      discountAmount: order.discount!.amount,
      discountType: order.discount!.type,
      promoItems: order.promoItems,
    });
  }, []);

  return (
    <section>
      <div>
        <ProductsCatalog
          onSubmit={onSubmit}
          closeUpdateMode={closeUpdateMode}
        />
      </div>
    </section>
  );
};
