<script setup lang="ts">
defineProps<{ description: string, fee: number, showFeeValue: boolean }>()
</script>

<template>
  <div class="flex justify-between pl-9 pr-4 py-3">
    <p class="font-bold">
      {{ description }}
    </p>
    <p>{{ showFeeValue ? `$${fee.toFixed(2)}`: '$ -' }}</p>
  </div>
</template>
