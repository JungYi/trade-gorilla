<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useDataStore } from '@/stores/data';
import type { RecommendationRequest, RecommendationResult } from '@trade-gorilla/shared';
import EvidenceBadge from '@/components/EvidenceBadge.vue';

const store = useDataStore();
const step = ref(1);
const loading = ref(false);
const recommendations = ref<RecommendationResult[]>([]);

const form = ref<RecommendationRequest>({
  travelFrequency: 'medium',
  needFx: false,
  taxConvenience: 'preferred',
  strategy: 'balanced',
  riskTolerance: 'medium',
});

const submit = async () => {
  loading.value = true;
  try {
    const res = await axios.post('/api/recommend', form.value);
    recommendations.value = res.data;
    step.value = 3; // Show results
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="max-w-2xl mx-auto py-10">
    <!-- Step 1: Questions -->
    <div v-if="step === 1" class="space-y-8 animate-fade-in">
      <h2 class="text-3xl font-bold">Let's find your match.</h2>
      
      <div class="space-y-4">
        <label class="block">
          <span class="text-lg font-medium">How often do you travel outside the Eurozone?</span>
          <select v-model="form.travelFrequency" class="mt-2 block w-full p-3 border rounded">
            <option value="low">Rarely</option>
            <option value="medium">Sometimes</option>
            <option value="high">Frequently (Digital Nomad)</option>
          </select>
        </label>

        <label class="block">
          <span class="text-lg font-medium">Is handling German taxes automatically critical?</span>
          <select v-model="form.taxConvenience" class="mt-2 block w-full p-3 border rounded">
            <option value="critical">Yes, I don't want to do paperwork.</option>
            <option value="preferred">Preferred, but not dealbreaker.</option>
            <option value="indifferent">No, I have a tax advisor.</option>
          </select>
        </label>

        <label class="block">
          <span class="text-lg font-medium">Primary Goal?</span>
          <select v-model="form.strategy" class="mt-2 block w-full p-3 border rounded">
            <option value="saver">Cash Interest (Safety)</option>
            <option value="investor">ETF Savings (Growth)</option>
          </select>
        </label>
      </div>

      <button @click="submit" :disabled="loading" class="w-full bg-black text-white py-4 rounded font-bold hover:bg-gray-800 disabled:opacity-50">
        {{ loading ? 'Analyzing...' : 'Get Recommendation' }}
      </button>
    </div>

    <!-- Step 2: Results -->
    <div v-if="step === 3" class="space-y-6">
      <h2 class="text-3xl font-bold">Top Picks for You</h2>
      <div v-for="(rec, idx) in recommendations" :key="rec.providerId" 
           class="border p-6 rounded-lg relative overflow-hidden">
        
        <div class="absolute top-0 right-0 bg-gray-100 px-3 py-1 text-xs font-bold uppercase" v-if="idx === 0">Best Match</div>

        <h3 class="text-xl font-bold mb-1">
          {{ store.getProviderById(rec.providerId)?.name }}
        </h3>
        
        <!-- Reasoning Engine Output -->
        <ul class="mb-4 space-y-1">
          <li v-for="reason in rec.reasoning" :key="reason" class="text-sm text-green-700 flex items-center">
            ✓ {{ reason }}
          </li>
        </ul>

        <!-- Evidence Link -->
        <div class="text-sm text-gray-500 border-t pt-3 mt-3">
          Evidence used: 
          <span v-for="fid in store.getProviderById(rec.providerId)?.factIds" :key="fid">
            <EvidenceBadge :factId="fid" />
          </span>
        </div>
      </div>
      
      <button @click="step = 1" class="text-sm underline text-gray-500">Start Over</button>
    </div>
  </div>
</template>
