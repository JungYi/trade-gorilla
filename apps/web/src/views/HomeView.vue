<template>
  <div class="max-w-4xl mx-auto text-center space-y-12">
    <div class="space-y-4 pt-10">
      <h1 class="text-5xl font-extrabold tracking-tight">Stop guessing. <br />Start accumulating.</h1>
      <p class="text-xl text-gray-500 max-w-2xl mx-auto">
        Compare German brokers with verified evidence. Visualize your compound interest.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <router-link to="/recommend" class="p-8 border border-gray-200 rounded-lg hover:border-black transition group text-left">
        <h3 class="text-2xl font-bold mb-2 group-hover:underline">Find a Broker &rarr;</h3>
        <p class="text-gray-500">Answer 5 questions to find the best setup for taxes and fees.</p>
      </router-link>

      <router-link to="/progress" class="p-8 border border-gray-200 rounded-lg hover:border-black transition group text-left">
        <h3 class="text-2xl font-bold mb-2 group-hover:underline">Track Habits &rarr;</h3>
        <p class="text-gray-500">Visualize daily interest accrual and consistency habits.</p>
      </router-link>
    </div>
  </div>
</template>
