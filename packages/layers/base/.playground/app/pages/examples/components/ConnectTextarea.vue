<script setup lang="ts">
const standardValue = ref('')
const prefilledValue = ref('Some pre-filled text')
const invalidValue = ref('')
const invalidAndFilledValue = ref('Invalid input')
</script>

<template>
  <div class="p-8 space-y-6">
    <h1>
      ConnectInput Example Page
    </h1>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold text-gray-700">
        Standard State
      </h2>
      <p class="text-gray-600">
        The label floats up when the input is focused or filled.
      </p>
      <div class="p-6 bg-white rounded-lg shadow-sm max-w-sm">
        <ConnectInput
          id="standard-input"
          v-model="standardValue"
          label="Standard Label"
        />
      </div>
    </div>

    <!-- Pre-filled State -->
    <div class="space-y-4">
      <h2 class="text-xl font-semibold text-gray-700">
        Pre-filled State
      </h2>
      <p class="text-gray-600">
        The label starts in the floated-up position because the input already has a value.
      </p>
      <div class="p-6 bg-white rounded-lg shadow-sm max-w-sm">
        <ConnectInput
          id="prefilled-input"
          v-model="prefilledValue"
          label="Pre-filled Label"
        />
      </div>
    </div>

    <!-- Invalid State -->
    <div class="space-y-4">
      <h2 class="text-xl font-semibold text-gray-700">
        Invalid State
      </h2>
      <p class="text-gray-600">
        The `invalid` prop is set to `true`. The label and input border should be red.
      </p>
      <div class="p-6 bg-white rounded-lg shadow-sm max-w-sm">
        <ConnectInput
          id="invalid-input"
          v-model="invalidValue"
          label="Invalid Label"
          :invalid="true"
        />
      </div>
    </div>

    <!-- Invalid and Pre-filled State -->
    <div class="space-y-4">
      <h2 class="text-xl font-semibold text-gray-700">
        Invalid & Pre-filled State
      </h2>
      <p class="text-gray-600">
        The component is both invalid and has a value.
      </p>
      <div class="p-6 bg-white rounded-lg shadow-sm max-w-sm">
        <ConnectInput
          id="invalid-filled-input"
          v-model="invalidAndFilledValue"
          label="Invalid & Filled Label"
          :invalid="true"
        />
      </div>
    </div>
  </div>
</template>