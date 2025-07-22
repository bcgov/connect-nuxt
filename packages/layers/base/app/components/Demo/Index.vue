<script setup lang="ts">
const show = ref(false)
</script>

<template>
  <div class="bg-connect-lightBlue p-10">
    <UButton
      label="Toggle hello"
      data-testid="demo-btn"
      @click="show = !show"
    />
    <div
      v-if="show"
      data-testid="demo-div"
      class="bg-red-100 p-5"
    >
      <slot>
        <p>Hello from base!</p>
      </slot>
    </div>
  </div>
</template>
