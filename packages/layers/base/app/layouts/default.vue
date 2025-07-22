<script setup lang="ts">
import { ConnectHeader } from '#components';

</script>

<template>
  <div class="app-container">
    <ConnectHeader />
    <div class="app-inner-container app-body">
      <div class="flex flex-col lg:flex-row lg:gap-6 grow">
        <div class="grow max-w-full overflow-hidden">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
