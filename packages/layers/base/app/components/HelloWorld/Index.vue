<script setup lang="ts">
const { myLayer } = useAppConfig()
</script>

<template>
  <div class="bg-primary">
    Should have bg-primary
    <h1>Hello World!</h1>
    <pre>{{ myLayer }}</pre>
    <p class="text-gray-900">
      Hello World text base should be gray-900
    </p>
  </div>
</template>
