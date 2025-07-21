<script setup lang="ts">
const { myLayer } = useAppConfig()
</script>

<template>
  <div class="bg-primary">
    Should have bg-primary
    <h1>Hello World!</h1>
    <pre>{{ myLayer }}</pre>
    <p class="text-bcGovGray-900">
      Hello World text base should be bcGovGray-900
    </p>
  </div>
</template>
