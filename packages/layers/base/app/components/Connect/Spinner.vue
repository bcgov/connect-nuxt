<script setup lang="ts">
const props = defineProps({
  fullscreen: {
    type: Boolean,
    default: false
  },
  size: {
    type: Number,
    default: 75
  }
})

const spinnerStyle = computed(() => ({
  '--spinner-size': `${props.size}px`,
  '--spinner-margin': `${props.size / -2}px`
}))
</script>

<template>
  <!-- eslint-disable tailwindcss/no-custom-classname -->
  <Teleport v-if="fullscreen" to="body">
    <div class="fixed inset-0 z-[999] h-screen w-screen bg-gray-100 opacity-50" />
    <svg
      class="spinner fixed"
      viewBox="0 0 50 50"
      :style="spinnerStyle"
    >
      <circle
        class="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke-width="5"
      />
    </svg>
  </Teleport>
  <svg
    v-else
    class="spinner absolute"
    viewBox="0 0 50 50"
    :style="spinnerStyle"
  >
    <circle
      class="path"
      cx="25"
      cy="25"
      r="20"
      fill="none"
      stroke-width="5"
    />
  </svg>
</template>

<style scoped>
  .spinner {
    animation: rotate 1.5s linear infinite;
    z-index: 10000;
    top: 50%;
    left: 50%;
    margin-top: var(--spinner-margin, -37.5px);
    margin-left: var(--spinner-margin, -37.5px);
    width: var(--spinner-size, 75px);
    height: var(--spinner-size, 75px);
    transform-origin: 50% 50%;
  }

  .spinner .path {
    stroke: #1669bb;
    stroke-linecap: round;
    animation: dash 1.25s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
</style>
