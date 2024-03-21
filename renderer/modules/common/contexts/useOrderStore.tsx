import { create } from 'zustand';

import { IDelivery } from '@/modules/cart/interfaces/IDelivery';
import { IOrder } from '@/modules/ordenes/interfaces/IOrder';

enum ORDER_SECTION_STATE {
  CREATE_TAKEAWAY = 'CREATE_TAKEAWAY',
  UPDATE_TAKEAWAY = 'UPDATE_TAKEAWAY',
  CREATE_DELIVERY = 'CREATE_DELIVERY',
  UPDATE_DELIVERY = 'UPDATE_DELIVERY',
  CREATE_TABLE = 'CREATE_TABLE',
  UPDATE_TABLE = 'UPDATE_TABLE',
  DEFAULT = 'DEFAULT',
}

interface IOrderState {
  orderState: ORDER_SECTION_STATE;
  orderToUpdate: IOrder | null;
  setOrderState: (orderState: ORDER_SECTION_STATE) => void;
  setOrderToUpdate: (orderToUpdate: IOrder) => void;
  delivery: IDelivery | null;
  setDelivery: (delivery: IDelivery | null) => void;
}

export const useOrderStore = create<IOrderState>((set) => ({
  orderState: ORDER_SECTION_STATE.DEFAULT,
  orderToUpdate: null,
  setOrderState: (orderState: ORDER_SECTION_STATE) => set({ orderState }),
  setOrderToUpdate: (orderToUpdate) => set({ orderToUpdate }),
  delivery: null,
  setDelivery: (delivery: IDelivery | null) => {
    console.log({ delivery });
    set({
      delivery,
    });
  },
}));

export const getIsProductCatalogActive = (state: IOrderState) =>
  state.orderState !== ORDER_SECTION_STATE.DEFAULT;

export const getIsOrderBeingUpdated = (state: IOrderState) =>
  [
    ORDER_SECTION_STATE.UPDATE_DELIVERY,
    ORDER_SECTION_STATE.UPDATE_TABLE,
    ORDER_SECTION_STATE.UPDATE_TAKEAWAY,
  ].includes(state.orderState);

export const getHideProductCatalog = (state: IOrderState) => () =>
  state.setOrderState(ORDER_SECTION_STATE.DEFAULT);

export const getCreateTakeAway = (state: IOrderState) => () =>
  state.setOrderState(ORDER_SECTION_STATE.CREATE_TAKEAWAY);

export const getIsCreateTakeAway = (state: IOrderState) =>
  state.orderState === ORDER_SECTION_STATE.CREATE_TAKEAWAY;

export const getUpdateTakeAway =
  (state: IOrderState) => (orderToUpdate: IOrder) => {
    state.setOrderState(ORDER_SECTION_STATE.UPDATE_TAKEAWAY);
    state.setOrderToUpdate(orderToUpdate);
  };

export const getIsUpdateTakeAway = (state: IOrderState) =>
  state.orderState === ORDER_SECTION_STATE.UPDATE_TAKEAWAY;

export const getOrderToUpdate = (state: IOrderState) => state.orderToUpdate;

export const getCreateDelivery = (state: IOrderState) => () =>
  state.setOrderState(ORDER_SECTION_STATE.CREATE_DELIVERY);

export const getIsCreateDelivery = (state: IOrderState) =>
  state.orderState === ORDER_SECTION_STATE.CREATE_DELIVERY;

export const getUpdateDelivery =
  (state: IOrderState) => (orderToUpdate: IOrder) => {
    state.setOrderState(ORDER_SECTION_STATE.UPDATE_DELIVERY);
    state.setDelivery(orderToUpdate.delivery!);
    state.setOrderToUpdate(orderToUpdate);
  };

export const getIsUpdateDelivery = (state: IOrderState) =>
  state.orderState === ORDER_SECTION_STATE.UPDATE_DELIVERY;

export const getDelivery = (state: IOrderState) => state.delivery;

export const getSetDelivery = (state: IOrderState) => state.setDelivery;
