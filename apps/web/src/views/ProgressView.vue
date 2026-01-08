<script setup lang="ts">
import { ref } from 'vue';
import DotGrid365 from '@/components/DotGrid365.vue';

const activeTab = ref<'interest' | 'dca'>('interest');
const balance = ref(10000);
const apr = ref(0.04);
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-8">
    <div class="flex justify-center space-x-4 border-b pb-4">
      <button 
        @click="activeTab = 'interest'" 
        :class="activeTab === 'interest' ? 'text-black border-b-2 border-black' : 'text-gray-400'"
        class="pb-2 px-4 font-bold"
      >
        Interest Accrual
      </button>
      <button 
        @click="activeTab = 'dca'"
        :class="activeTab === 'dca' ? 'text-black border-b-2 border-black' : 'text-gray-400'"
        class="pb-2 px-4 font-bold"
      >
        DCA Consistency
      </button>
    </div>

    <div v-if="activeTab === 'interest'" class="space-y-6">
      <div class="flex gap-4 justify-center bg-gray-50 p-4 rounded">
        <label>
          <span class="block text-xs font-bold uppercase text-gray-400">Cash Balance</span>
          <input v-model.number="balance" type="number" class="bg-transparent border-b border-gray-300 w-32 focus:outline-none font-mono" /> €
        </label>
        <label>
          <span class="block text-xs font-bold uppercase text-gray-400">Interest Rate</span>
          <input v-model.number="apr" type="number" step="0.001" class="bg-transparent border-b border-gray-300 w-16 focus:outline-none font-mono" />
        </label>
      </div>
      <DotGrid365 mode="interest" :amount="balance" :rate="apr" />
    </div>

    <div v-else class="text-center py-10">
      <DotGrid365 mode="dca" :amount="0" :rate="0" :completedCount="35" />
      <p class="mt-4 text-gray-500">Visualization of weekly contribution consistency.</p>
    </div>
  </div>
</template>
