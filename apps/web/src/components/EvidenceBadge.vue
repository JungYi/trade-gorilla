<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '@/stores/data';

const props = defineProps<{
  factId: string;
}>();

const store = useDataStore();
const fact = computed(() => store.getFactById(props.factId));
const source = computed(() => (fact.value ? store.getSourceById(fact.value.sourceId) : null));

const formattedDate = computed(() => {
  if (!source.value) return '';
  return new Date(source.value.lastVerified).toLocaleDateString('de-DE');
});
</script>

<template>
  <div v-if="fact && source" class="group relative inline-block ml-1 align-middle">
    <!-- Trigger -->
    <span class="cursor-help text-[10px] font-bold text-gray-400 border border-gray-200 rounded px-1 hover:bg-gray-100 transition">
      SRC
    </span>

    <!-- Tooltip (Battlecard Style) -->
    <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 hidden group-hover:block z-50">
      <div class="bg-black text-white p-3 rounded text-xs shadow-xl leading-relaxed">
        <p class="font-bold mb-1">{{ source.publisher }} ({{ source.jurisdiction }})</p>
        <p class="italic opacity-80 mb-2">"{{ source.excerpt }}"</p>
        <div class="flex justify-between items-center text-[10px] text-gray-400 border-t border-gray-700 pt-2">
          <span>Verified: {{ formattedDate }}</span>
          <a :href="source.url" target="_blank" rel="noopener noreferrer" class="underline hover:text-white">
            Link &rarr;
          </a>
        </div>
      </div>
      <!-- Triangle -->
      <div class="w-2 h-2 bg-black rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1"></div>
    </div>
  </div>
</template>
