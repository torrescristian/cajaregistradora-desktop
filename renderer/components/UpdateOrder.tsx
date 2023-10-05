import { getSetCart, useCartStore } from '@/contexts/CartStore';
import { ICartItem } from '@/interfaces/ICart';
import { IOrder, IOrderItem } from '@/interfaces/IOrder';
import { useEffect } from 'react';
import Cart from './Cart/Cart';
import Products from './Products';

interface IProps {
  order: IOrder;
  onSubmit: () => void;
}

export const UpdateOrder = ({ order, onSubmit }: IProps) => {
  const setCart = useCartStore(getSetCart);

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
    });
  }, []);

  return (
    <section className="flex flex-col w-screen">
      <Products />
      <Cart updateMode order={order} onSubmit={onSubmit} />
    </section>
  );
};
