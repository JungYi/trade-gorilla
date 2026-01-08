<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  mode: 'interest' | 'dca';
  amount: number; // Balance or Monthly contribution
  rate: number; // APR (decimal, e.g. 0.04) or n/a
  completedCount?: number; // For DCA
}>();

// Reason: SVG is more accessible and easier to scale than Canvas for this use case
const dots = computed(() => {
  const arr = [];
  const totalDays = 365;
  const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  
  for (let i = 0; i < totalDays; i++) {
    let isActive = false;
    let title = `Day ${i + 1}`;

    if (props.mode === 'interest') {
      isActive = i < dayOfYear;
      // Indicative daily accrual calculation
      const dailyEarn = (props.amount * props.rate) / 365;
      const accrued = dailyEarn * (i + 1);
      title = `Day ${i + 1}: ~${accrued.toFixed(2)}€ accrued (Indicative)`;
    } else {
      // DCA Mode: Visualize consistency (assuming weekly checks for grid, roughly)
      // Simplifying to mapped "checkpoints" for the MVP visualization
      isActive = i < (props.completedCount || 0);
      title = isActive ? 'Contribution Completed' : 'Planned';
    }

    arr.push({ id: i, isActive, title });
  }
  return arr;
});
</script>

<template>
  <div class="w-full overflow-hidden">
    <div class="flex flex-wrap gap-1 justify-center max-w-2xl mx-auto" role="img" aria-label="365 Day Progress Grid">
      <div
        v-for="dot in dots"
        :key="dot.id"
        :title="dot.title"
        class="w-2 h-2 rounded-full transition-all duration-300"
        :class="dot.isActive ? 'bg-green-500 scale-110' : 'bg-gray-100'"
      ></div>
    </div>
    
    <div class="mt-4 text-center text-sm text-gray-500">
      <span v-if="mode === 'interest'">
        Est. Annual Return: <span class="font-bold text-black">{{ (amount * rate).toFixed(2) }}€</span>
        <span class="block text-xs mt-1 text-gray-400">*Based on {{ (rate * 100).toFixed(2) }}% APR. Tax/terms apply.</span>
      </span>
      <span v-else>
        Consistency is key. This is a visualization of habit, not performance.
      </span>
    </div>
  </div>
</template>
