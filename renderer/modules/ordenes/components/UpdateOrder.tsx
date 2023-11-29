import { getSetCart, useCartStore } from '@/modules/cart/contexts/useCartStore';
import { IOrder, IOrderItem } from '@/modules/ordenes/interfaces/IOrder';
import { useEffect } from 'react';
import Products from '@/modules/products/components/Products';
import Cart from '@/modules/cart/components/Cart';
import { ICartItem } from '@/modules/cart/interfaces/ICart';
import useIsMobile from '@/modules/reabastecer/hooks/useIsMobile';
import { ProductsMobile } from '@/modules/products/components/ProductsMobile';

interface IProps {
  order: IOrder;
  onSubmit: () => void;
  closeUpdateMode: () => void;
  updateMode?: boolean;
}

export const UpdateOrder = ({
  order,
  onSubmit,
  closeUpdateMode,
  updateMode,
}: IProps) => {
  const setCart = useCartStore(getSetCart);
  const isMobile = useIsMobile();

  const adaptOrderItemToCartItem = (orderItem: IOrderItem): ICartItem => {
    return {
      product: orderItem.product!,
      quantity: orderItem.quantity,
      selectedVariant: orderItem.selectedVariant!,
    };
  };

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
      {isMobile ? (
        <div>
          <ProductsMobile
            updateMode={updateMode}
            order={order}
            onSubmit={onSubmit}
            closeUpdateMode={closeUpdateMode}
          />
        </div>
      ) : (
        <div className="flex flex-col w-[85vw]">
          <Products />
          <Cart updateMode order={order} onSubmit={onSubmit} />
        </div>
      )}
    </section>
  );
};
