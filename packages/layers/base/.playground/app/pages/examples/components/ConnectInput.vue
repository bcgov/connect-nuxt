<script setup lang="ts">
definePageMeta({
  layout: 'connect-sidebar',
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'Connect Input' }
  ]
})
const standardValue = ref('')
const invalidValue = ref('')
const maskedValue = ref('')
const extraAttrsValue = ref('')
</script>

<template>
  <div class="flex flex-col gap-10">
    <h1>
      ConnectInput
    </h1>

    <ConnectPageSection :heading="{ label: 'Props' }" ui-body="p-4 space-y-4">
      <ul>
        <li>`v-model` - string - required</li>
        <li>`label` - string - required</li>
        <li>`mask` - string - optional</li>
      </ul>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Standard State' }" ui-body="p-4 space-y-4">
      <ConnectInput
        id="standard-input"
        v-model="standardValue"
        label="Standard Label"
      />
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Invalid State' }" ui-body="p-4 space-y-4">
      <p>
        The `aria-invalid` attribute can be used to show an error state on the input.
      </p>
      <p>
        Note: If using NuxtUI UFormField, aria-invalid will be set on the input by the wrapper component.
      </p>
      <ConnectInput
        id="invalid-input"
        v-model="invalidValue"
        label="Invalid Label"
        aria-invalid="true"
      />
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Masked Input' }" ui-body="p-4 space-y-4">
      <p>
        The `mask` prop can be used to format user input automatically. This example uses a phone number mask.
      </p>
      <p>
        The input mask is using vMaska. Please see the docs for full options.
      </p>
      <div>
        <a
          class="text-(--ui-mark) font-bold underline"
          href="https://beholdr.github.io/maska/v3/#/vue"
          target="_blank"
        >vMaska Docs</a>
      </div>
      <ConnectInput
        id="masked-input"
        v-model="maskedValue"
        label="Phone Number"
        mask="(###) ###-####"
      />
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Extra Attributes' }" ui-body="p-4 space-y-4">
      <p>
        Any attributes not defined as props (like `name` or `autocomplete`)
        are automatically passed down to the underlying input element.
      </p>
      <ConnectInput
        id="extra-attrs-input"
        v-model="extraAttrsValue"
        label="Email Address"
        name="email"
        autocomplete="email"
      />
    </ConnectPageSection>
  </div>
</template>
