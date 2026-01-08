<script setup lang="ts">
import { onMounted } from 'vue';
import { useDataStore } from './stores/data';

const dataStore = useDataStore();

onMounted(() => {
  dataStore.fetchAll();
});
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="border-b border-gray-100 py-4">
      <div class="container mx-auto px-4 flex justify-between items-center">
        <router-link to="/" class="text-xl font-bold tracking-tight">Trade Gorilla</router-link>
        <nav class="space-x-6 text-sm font-medium text-gray-600">
          <router-link to="/compare" class="hover:text-black">Compare</router-link>
          <router-link to="/recommend" class="hover:text-black">Wizard</router-link>
          <router-link to="/progress" class="hover:text-black">Progress</router-link>
        </nav>
      </div>
    </header>

    <main class="flex-grow container mx-auto px-4 py-8">
      <router-view v-if="!dataStore.isLoading" />
      <div v-else class="text-center py-20">Loading evidence...</div>
    </main>

    <footer class="border-t border-gray-100 py-8 text-xs text-gray-400">
      <div class="container mx-auto px-4 text-center space-y-2">
        <p>Trade Gorilla is an informational tool.</p>
        <p>
          <strong>Disclaimer:</strong> Not financial or legal advice. Capital at risk.
          All claims are sourced and time-stamped, but terms may change.
          Always verify directly with providers.
        </p>
      </div>
    </footer>
  </div>
</template>
