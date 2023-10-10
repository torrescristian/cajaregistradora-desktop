import { IDiscount } from './IOrder';
import { IProduct, PRODUCT_TYPE } from './IProduct';
import { IVariant } from './IVariants';
import { IResponsePage, IStrapiResponse, IStrapiSingleResponse } from './utils';

export interface IPartialVariant {
  id: number;
  name: string;
  product: {
    id: number;
    name: string;
    type: PRODUCT_TYPE;
  };
}

export interface ICoupon<VARIANT = IPartialVariant> {
  id?: number;
  code: string;
  variant: VARIANT | null;
  dueDate?: string;
  discount: IDiscount;
  maxAmount: number;
  availableUses: number;
}

export type ICouponResponse = IResponsePage<
  ICoupon<
    IStrapiSingleResponse<IVariant<number, IStrapiSingleResponse<IProduct>>>
  >
>;

export type ICouponPayload = ICoupon<number>;
