<script setup lang="ts">
defineProps<{
  content?: string
}>()
</script>

<template>
  <div
    v-sanitize="content"
    class="tos-content max-w-full wrap-break-word space-y-6 *:space-y-4"
  />
</template>

<style scoped>
@reference "#connect-theme";

.tos-content :deep(header) {
  @apply font-bold text-neutral-highlighted;
}

.tos-content :deep(ul) {
  @apply space-y-1;
}

.tos-content :deep(ul li span:first-child) {
  @apply mr-1;
}
</style>
