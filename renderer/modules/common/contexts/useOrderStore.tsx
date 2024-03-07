import { create } from 'zustand';

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
  setOrderState: (orderState: ORDER_SECTION_STATE) => void;
}

export const useOrderStore = create<IOrderState>((set) => ({
  orderState: ORDER_SECTION_STATE.DEFAULT,
  setOrderState: (orderState: ORDER_SECTION_STATE) => set({ orderState }),
}));

export const getIsProductCatalogActive = (state: IOrderState) =>
  state.orderState !== ORDER_SECTION_STATE.DEFAULT;
export const getHideProductCatalog = (state: IOrderState) => () =>
  state.setOrderState(ORDER_SECTION_STATE.DEFAULT);
export const getCreateTakeAway = (state: IOrderState) => () =>
  state.setOrderState(ORDER_SECTION_STATE.CREATE_TAKEAWAY);
export const getIsCreateTakeAway = (state: IOrderState) =>
  state.orderState === ORDER_SECTION_STATE.CREATE_TAKEAWAY;
export const getIsUpdateTakeAway = (state: IOrderState) =>
  state.orderState === ORDER_SECTION_STATE.UPDATE_TAKEAWAY;
