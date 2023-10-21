import { IDiscount } from './IOrder';
import { IProduct, IProductType } from './IProduct';
import { IVariant } from './IVariants';
import { IResponsePage, IStrapiSingleResponse } from './utils';

export interface IPartialVariant {
  id: number;
  name: string;
  product: {
    id: number;
    name: string;
    type: IProductType;
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

export type ICouponResponse = IResponsePage<ICoupon>;

export type ICouponPayload = ICoupon<number>;
