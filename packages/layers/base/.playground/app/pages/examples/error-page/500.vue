<script setup lang="ts">
definePageMeta({
  middleware: () => {
    throw createError({
      statusCode: 500,
      fatal: true
    })
  }
})
</script>

<template>
  <div class="p-8 space-y-6">
    Empty
  </div>
</template>
