import { defineStore } from 'pinia';
import axios from 'axios';
import type { Provider, Source, Fact } from '@trade-gorilla/shared';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const useDataStore = defineStore('data', {
  state: () => ({
    providers: [] as Provider[],
    sources: [] as Source[],
    facts: [] as Fact[],
    isLoading: false,
    error: null as string | null,
  }),
  getters: {
    getProviderById: (state) => (id: string) => state.providers.find((p) => p.id === id),
    getSourceById: (state) => (id: string) => state.sources.find((s) => s.id === id),
    getFactById: (state) => (id: string) => state.facts.find((f) => f.id === id),
  },
  actions: {
    /**
     * Fetch all core datasets in parallel.
     * This keeps the initial page load fast and predictable.
     *
     * IMPORTANT:
     * - API_BASE_URL is injected via Vite env variables.
     * - This allows the same code to work in local dev and production.
     */
    async fetchAll() {
      this.isLoading = true;
      this.error = null;
      try {
        const [pRes, sRes, fRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/providers`),
          axios.get(`${API_BASE_URL}/api/sources`),
          axios.get(`${API_BASE_URL}/api/facts`),
        ]);
        this.providers = pRes.data;
        this.sources = sRes.data;
        this.facts = fRes.data;
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch data';
      } finally {
        this.isLoading = false;
      }
    },
  },
});
