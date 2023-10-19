import IStore from './IStore';
import { IResponsePage } from './utils';

export interface INotification<STORE = IStore> {
  id?: number;
  seen: boolean;
  description: string;
  store?: STORE;
}

export type INotificationPayload = INotification<number>;
export type INotificationResponse = IResponsePage<INotification>;
