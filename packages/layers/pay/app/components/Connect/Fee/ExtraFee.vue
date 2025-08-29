<script setup lang="ts">
const { t } = useI18n()

const props = defineProps<{ description: string, fee: number, showFeeValue: boolean }>()

const itemFee = computed(() => {
  const total = props.fee.toFixed(2)
  if (total === '0.00') {
    return t('connect.label.noFee')
  }
  return `$${total}`
})
</script>

<template>
  <div class="flex justify-between pl-9 pr-3 py-3">
    <p class="font-bold text-highlighted">
      {{ description }}
    </p>
    <p class="text-highlighted">{{ showFeeValue ? itemFee: '$ -' }}</p>
  </div>
</template>
