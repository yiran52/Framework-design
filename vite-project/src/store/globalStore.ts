import { create } from 'zustand';

interface DataItem { }

interface GlobalState {
  sharedData: DataItem[];
  loadSharedData: () => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  sharedData: [],

  loadSharedData: async () => {

  }
}));