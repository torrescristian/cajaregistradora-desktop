import { DISCOUNT_TYPE } from '@/modules/ordenes/interfaces/IOrder';
import { IProduct } from '@/modules/products/interfaces/IProduct';
import { IPromo } from '@/modules/promos/interfaces/IPromo';
import { IVariant, IVariantPromo } from '@/modules/common/interfaces/IVariants';

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
  discountAmount?: number | string;
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
