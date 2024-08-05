import { create } from 'zustand';
import { getLocalLoginInfo } from '../api';

interface DataItem {}

interface GlobalState {
  sharedData: DataItem[];
  loadSharedData: () => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  sharedData: [],
  
  loadSharedData: async () => {
    try {
      const response = await getLocalLoginInfo();
      set({ sharedData: response.data });
    } catch (error) {
      console.error('Failed to fetch shared data:', error);
    }
  }
}));