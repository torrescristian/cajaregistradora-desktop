import { ICouponPayload } from '@/interfaces/ICoupon';
import Dexie, { Table } from 'dexie';

export class CajaRegistradora extends Dexie {
  coupons!: Table<ICouponPayload>;

  constructor() {
    super('CajaRegistradora');
    this.version(1).stores({
      coupons: '&uid',
    });
  }
}
export const db = new CajaRegistradora();
