import { getSetCart, useCartStore } from '@/contexts/CartStore';
import { ICartItem } from '@/interfaces/ICart';
import { IOrder, IOrderItem } from '@/interfaces/IOrder';
import { useEffect } from 'react';
import Cart from './Cart';
import Products from './Products';

interface IProps {
  order: IOrder;
}

export const UpdateOrder = ({ order }: IProps) => {
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
    });
  }, []);

  return (
    <section className="flex flex-col w-screen">
      <Products updateMode />
      <Cart updateMode order={order} />
    </section>
  );
};
