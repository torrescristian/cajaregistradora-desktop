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
