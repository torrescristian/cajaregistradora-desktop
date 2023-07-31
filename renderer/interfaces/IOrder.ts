export interface IOrderUI {
  id: number;
  totalPrice: number;
  lastUpdate: string;
}

export default interface IOrder {
  id: number;
  attributes:
  {
    createAt: string;
    last_update: string;
    total_price: number;
    updatedAt: string;
  }
}
