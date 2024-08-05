import {create} from 'zustand';
import { DataItem, Config } from './interface';
import { fetchData, fetchConfig } from '@/api';

interface PageState {
  localData: DataItem[];
  config: Config | null;
  loading: boolean;
  configId: string | null;
  loadLocalData: (params?: any) => void;
  fetchConfigData: (id: string) => void;
  openDrawer: (id: string) => void;
  closeDrawer: () => void;
}

export const useModel = create<PageState>((set,get) => ({
  localData: [],
  config: null,
  loading: false,
  configId: null,

  loadLocalData: async (params?: any) => {
    set({ loading: true });
    try {
      const response = await fetchData();
      set({ localData: response.data });
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      set({ loading: false });
    }
  },

  fetchConfigData: async (id: string) => {
    try {
      const response = await fetchConfig(id);
      set({ config: response.data, configId: id });
    } catch (error) {
      console.error('Failed to fetch config:', error);
    }
  },

  openDrawer: (id: string) => {
    set({ configId: id });
    get().fetchConfigData(id);
  },

  closeDrawer: () => {
    set({ configId: null, config: null });
  }
}));