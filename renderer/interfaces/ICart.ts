import { IOrderUI } from './IOrder';
import IProductUI from './IProduct';

export interface ICartItem {
  product: IProductUI;
  quantity: number;
}

export interface ICartState {
  cartItems: ICartItem[];
  totalAmount: number;
  totalQuantity: number;
  reset?: boolean;
  clientName: string;
  clientPhone: string;
  clientAddress: string;
  totalPrice: number;
}

export interface ICartAction {
  type:
    | 'ADD_PRODUCT'
    | 'REMOVE_PRODUCT'
    | 'CLEAR_CART'
    | 'REMOVE_CART_ITEM'
    | 'INIT_CART'
    | 'UPDATE_PRICE';
  payload?: ICartState | IProductUI | number | any;
}
