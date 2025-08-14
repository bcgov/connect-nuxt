<script setup lang="ts">
definePageMeta({
  layout: 'connect-base'
})

const standardValue = ref('')
const prefilledValue = ref('Some pre-filled text for the textarea.')
const invalidValue = ref('')
const invalidAndFilledValue = ref('This is an invalid input with some text.')
const extraAttrsValue = ref('')
</script>

<template>
  <div class="py-8 space-y-6">
    <h1>
      ConnectTextarea
    </h1>

    <ConnectPageSection :heading="{ label: 'Props' }" ui-body="p-4 space-y-4">
      <ul>
        <li>`v-model` - string - required</li>
        <li>`label` - string - required</li>
        <li>`id` - string - required</li>
      </ul>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Standard State' }" ui-body="p-4 space-y-4">
      <p>
        The label floats up when the textarea is focused or filled.
      </p>
      <ConnectTextarea
        id="standard-textarea"
        v-model="standardValue"
        label="Standard Label"
      />
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Pre-filled State' }" ui-body="p-4 space-y-4">
      <p>
        The label starts in the floated-up position because the textarea already has a value.
      </p>
      <ConnectTextarea
        id="prefilled-textarea"
        v-model="prefilledValue"
        label="Pre-filled Label"
      />
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Invalid State' }" ui-body="p-4 space-y-4">
      <p>
        The `aria-invalid` attribute can be used to show an error state on the input.
      </p>
      <p>
        Note: If using NuxtUI UFormField, aria-invalid will be set on the input by the wrapper component.
      </p>
      <ConnectTextarea
        id="invalid-textarea"
        v-model="invalidValue"
        label="Invalid Label"
        aria-invalid="true"
      />
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Invalid & Pre-filled State' }" ui-body="p-4 space-y-4">
      <p>
        The component is both invalid and has a value.
      </p>
      <ConnectTextarea
        id="invalid-filled-textarea"
        v-model="invalidAndFilledValue"
        label="Invalid & Filled Label"
        :invalid="true"
      />
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Extra Attributes' }" ui-body="p-4 space-y-4">
      <p>
        Any attributes not defined as props (like `name` or `rows`) are
        automatically passed down to the underlying UTextarea element.
      </p>
      <ConnectTextarea
        id="extra-attrs-textarea"
        v-model="extraAttrsValue"
        label="Description"
        name="description"
        rows="5"
      />
    </ConnectPageSection>
  </div>
</template>
