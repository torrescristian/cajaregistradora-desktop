import IClient from './IClient';
import { IOrder } from './IOrder';
import { IResponsePage } from './utils';

export enum DELIVERY_STATUS {
  PENDING = 'PENDING',
  READY = 'READY',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export interface IDelivery<ORDER = IOrder, CLIENT = IClient> {
  id?: number;
  userName: string;
  userAddress: string;
  userPhone: string;
  order?: ORDER;
  client?: CLIENT;
  status: DELIVERY_STATUS;
}

export type IDeliveryPayload = IDelivery<number, number>;
export type IDeliveryResponse = IResponsePage<IOrder>;
