import { defineStore } from 'pinia';
import axios from 'axios';
import type { Provider, Source, Fact } from '@trade-gorilla/shared';

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
    async fetchAll() {
      this.isLoading = true;
      try {
        const [pRes, sRes, fRes] = await Promise.all([
          axios.get('/api/providers'),
          axios.get('/api/sources'),
          axios.get('/api/facts'),
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
