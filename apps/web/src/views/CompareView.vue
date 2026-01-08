<script setup lang="ts">
import { useDataStore } from '@/stores/data.ts';
import EvidenceBadge from '@/components/EvidenceBadge.vue';

const store = useDataStore();
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold">Broker Comparison</h1>
    <div class="overflow-x-auto border rounded-lg">
      <table class="w-full text-left text-sm">
        <thead class="bg-gray-50 border-b">
          <tr>
            <th class="p-4 font-semibold">Provider</th>
            <th class="p-4 font-semibold">Interest</th>
            <th class="p-4 font-semibold">Cost</th>
            <th class="p-4 font-semibold">Tax (DE)</th>
            <th class="p-4 font-semibold">Deposit Protection</th>
          </tr>
        </thead>
        <tbody class="divide-y">
          <tr v-for="p in store.providers" :key="p.id" class="hover:bg-gray-50">
            <td class="p-4">
              <div class="font-bold text-base">{{ p.name }}</div>
              <div class="text-xs text-gray-500">{{ p.tagline }}</div>
            </td>
            <td class="p-4">
              <span v-if="p.attributes.interestRate > 0" class="text-green-600 font-bold">
                {{ (p.attributes.interestRate * 100).toFixed(2) }}%
              </span>
              <span v-else class="text-gray-300">-</span>
            </td>
            <td class="p-4">
              {{ p.attributes.annualFee > 0 ? `${p.attributes.annualFee}€/yr` : 'Free' }}
              <div v-if="p.attributes.fxFeePercentage > 0" class="text-xs text-gray-400">
                + {{ p.attributes.fxFeePercentage }}% FX
              </div>
            </td>
            <td class="p-4">
              <span v-if="p.attributes.isTaxConvenient" class="bg-gray-100 text-xs px-2 py-1 rounded">Auto</span>
              <span v-else class="text-red-500 text-xs">Manual</span>
            </td>
            <td class="p-4 flex items-center">
              {{ p.attributes.depositProtection }}
              <!-- Render Evidence Badges for relevant facts -->
              <template v-for="fid in p.factIds" :key="fid">
                <EvidenceBadge :factId="fid" />
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
