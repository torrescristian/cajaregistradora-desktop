import { create } from 'zustand';
interface IState {
  isDrawerOpen: boolean;
  content: any | null;
  openDrawer: (content: any) => void;
  closeDrawer: () => void;
}

export const useDrawerStore = create<IState>((set) => ({
  isDrawerOpen: false,
  content: null,
  openDrawer: (content) => set({ isDrawerOpen: true, content }),
  closeDrawer: () => set({ isDrawerOpen: false, content: null }),
}));

export const getIsDrawerOpen = (state: IState) => state.isDrawerOpen;
export const getContent = (state: IState) => state.content;
export const getCloseDrawer = (state: IState) => state.closeDrawer;
export const getOpenDrawer = (state: IState) => state.openDrawer;
