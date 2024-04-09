import { create } from 'zustand';
interface IState {
  isModalOpen: boolean;
  Content: any | null;
  openModal: (Content: any) => void;
  closeModal: () => void;
}

export const useModalStore = create<IState>((set) => ({
  isModalOpen: false,
  Content: null,
  openModal: (Content) => set({ isModalOpen: true, Content }),
  closeModal: () => set({ isModalOpen: false, Content: null }),
}));

export const getIsModalOpen = (state: IState) => state.isModalOpen;
export const getContent = (state: IState) => state.Content;
export const getCloseModal = (state: IState) => state.closeModal;
export const getOpenModal = (state: IState) => state.openModal;
