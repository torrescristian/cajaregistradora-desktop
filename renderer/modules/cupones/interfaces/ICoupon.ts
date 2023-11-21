import { IDiscount } from '@/modules/ordenes/interfaces/IOrder';
import { IProductType } from '@/modules/products/interfaces/IProduct';
import { IResponsePage } from '@/modules/common/interfaces/utils';

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
