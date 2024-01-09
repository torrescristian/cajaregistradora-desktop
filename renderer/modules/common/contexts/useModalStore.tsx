import { create } from 'zustand';
import OutsideAlerter from '../components/OutsideAlerter';
interface IState {
  isOpen: boolean;
  content: any | null;
  openModal: (content: any) => void;
  closeModal: () => void;
}

export const useModalStore = create<IState>((set) => ({
  isOpen: false,
  content: null,
  openModal: (content) => set({ isOpen: true, content }),
  closeModal: () => set({ isOpen: false, content: null }),
}));

export const getIsOpen = (state: IState) => state.isOpen;
export const getContent = (state: IState) => state.content;
export const getCloseModal = (state: IState) => state.closeModal;
export const getOpenModal = (state: IState) => state.openModal;
