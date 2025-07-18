<script setup lang="ts">
const { myLayer } = useAppConfig()
</script>

<template>
  <div class="bg-primary">
    <h1>Hello World! NEW x 3!!!</h1>
    <pre>{{ myLayer }}</pre>
    <p class="text-bcGovGray-900">
      Hello World text base
    </p>
  </div>
</template>
