<script setup lang="ts">
const {
  stateKey = 'default-button-control'
} = defineProps<{
  stateKey?: string
}>()
</script>

<template>
  <div
    class="bg-shade-inverted pb-6 pt-10"
    data-testid="connect-button-control-wrapper"
  >
    <div class="app-inner-container app-body">
      <ConnectButtonControl :state-key="stateKey" />
    </div>
  </div>
</template>
