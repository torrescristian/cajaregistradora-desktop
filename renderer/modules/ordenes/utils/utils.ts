import { IOrder, ORDER_STATUS } from '../interfaces/IOrder';

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
