import create from 'zustand';

interface ITakeAway {
  isTakeAwayOpen: boolean;
  openTakeAway: () => void;
  closeTakeAway: () => void;
}

export const useTakeAwayStore = create<ITakeAway>((set) =>  ({
    isTakeAwayOpen: false,
    openTakeAway: () => set({ isTakeAwayOpen: true }),
    closeTakeAway: () => set({ isTakeAwayOpen: false}),
  }));

export const getIsTakeAwayOpen = (state: ITakeAway) => state.isTakeAwayOpen;
export const getOpenTakeAway = (state: ITakeAway) => state.openTakeAway;
export const getCloseTakeAway = (state: ITakeAway) => state.closeTakeAway;