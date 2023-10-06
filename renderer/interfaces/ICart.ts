import { DISCOUNT_TYPE } from './IOrder';
import { IProduct } from './IProduct';
import { IPromo} from './IPromo';
import { IVariant, IVariantPromo } from './IVariants';

export interface ICartItem {
  product: IProduct;
  quantity: number;
  selectedVariant: IVariant;
}
export interface IPromoItem {
  promo: IPromo;
  selectedVariants: IVariantPromo[];
}
export interface ICartState {
  cartItems: ICartItem[];
  reset?: boolean;
  discountType?: DISCOUNT_TYPE;
  discountAmount?: number;
  totalPrice: number;
  additionalDetails: string;
  subtotalPrice: number;
  promoItems: IPromoItem[];
}

export interface ICartAction {
  type:
    | 'ADD_PRODUCT'
    | 'REMOVE_PRODUCT'
    | 'CLEAR_CART'
    | 'REMOVE_CART_ITEM'
    | 'INIT_CART'
    | 'UPDATE_PRICE';
  payload?: ICartState | IProduct | number | any;
}
