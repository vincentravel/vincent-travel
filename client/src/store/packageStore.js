import { create } from 'zustand';
import api from '../lib/api';

export const usePackageStore = create((set, get) => ({
  packages: [],
  loading: false,
  error: null,
  fetched: false,

  fetchPackages: async (force = false) => {
    if (get().fetched && !force) return;
    set({ loading: true, error: null });
    try {
      const { data } = await api.get('/packages');
      set({ packages: data.packages, loading: false, fetched: true });
    } catch (err) {
      set({
        error: err.response?.data?.message || 'No se pudieron cargar los paquetes',
        loading: false,
      });
    }
  },
}));
