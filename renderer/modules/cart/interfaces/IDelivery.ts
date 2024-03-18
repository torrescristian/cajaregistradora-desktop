import { IOrder } from '@/modules/ordenes/interfaces/IOrder';
import { IResponsePage } from '@/modules/common/interfaces/utils';

import IClient from './IClient';

export enum DELIVERY_STATUS {
  PENDING = 'PENDING',
  READY = 'READY',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export interface IDelivery<ORDER = IOrder, CLIENT = IClient> {
  userName: string;
  userAddress: string;
  userPhone: string;
  order?: ORDER;
  client?: CLIENT;
  status: DELIVERY_STATUS;
}

export type IDeliveryPayload = IDelivery<number, number>;
export type IDeliveryResponse = IResponsePage<IOrder>;
