import { ICartItem } from '@/modules/cart/interfaces/ICart';
import { IOrder, IOrderItem, ORDER_STATUS } from '../interfaces/IOrder';

export function getTranslateOrderStatus(orderStatus: ORDER_STATUS) {
  switch (orderStatus) {
    case ORDER_STATUS.PENDING:
      return 'Pendiente';
    case ORDER_STATUS.PAID:
      return 'Pagado';
    case ORDER_STATUS.CANCELLED:
      return 'Cancelado';
  }
}

export const adaptCartItemToOrderItem = (cartItem: ICartItem): IOrderItem => {
  return {
    product: cartItem.product,
    quantity: cartItem.quantity,
    selectedVariant: cartItem.selectedVariant,
    price: cartItem.selectedVariant.price,
  };
};

export const adaptOrderItemToCartItem = (orderItem: IOrderItem): ICartItem => {
  return {
    product: orderItem.product!,
    quantity: orderItem.quantity,
    selectedVariant: orderItem.selectedVariant!,
  };
};
