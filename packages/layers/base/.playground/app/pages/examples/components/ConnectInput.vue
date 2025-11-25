<script setup lang="ts">
import type { InputProps } from '@nuxt/ui'
import { UIcon } from '#components'

definePageMeta({
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'Connect Input' }
  ]
})
const standardValue = ref('')
const invalidValue = ref('')
const maskedValue = ref('')
const extraAttrsValue = ref('')
const propExampleValue = ref('')
const slotExampleValue = ref('')

/** Computed props for UInput Provide/Inject example **/
const uInputProps = computed<InputProps>(() => ({
  loading: (propExampleValue.value?.length ?? 0) <= 2,
  trailing: true,
  ui: { trailingIcon: 'text-success size-7' },
  trailingIcon: (propExampleValue.value?.length ?? 0) === 3 ? 'i-mdi-check' : undefined,
  maxLength: 3
}))

// Provide props for ConnectInput to inject
// provide is scoped to this component and its children - further scope by id
provide('UInput-props-provided-props-input', uInputProps)

/** Injected slots for UInput Provide/Inject example **/
const injectedSlots = {
  leading: h(UIcon, { name: 'i-mdi-account', class: 'text-primary size-6' }),
  trailing: h(UIcon, { name: 'i-mdi-check-circle', class: 'text-success size-6' })
}

// Provide slots for ConnectInput to inject
provide('UInput-slots-provided-slots-input', injectedSlots)
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

    <ConnectPageSection :heading="{ label: 'Provide/Inject Props Input' }" ui-body="p-4 space-y-4">
      <p>
        Props can be provided to the underlying UInput component using Vue's provide/inject system.
      </p>

      <ConnectInput
        id="provided-props-input"
        v-model="propExampleValue"
        label="Provided Props Input"
      />

      <p>
        Slot can be provided to the underlying UInput component using Vue's provide/inject system.
      </p>

      <ConnectInput
        id="provided-slots-input"
        v-model="slotExampleValue"
      />

      <p>
        See the root component documentation for an example of which props/slots can be provided.
      </p>
      <div>
        <a
          class="text-(--ui-mark) font-bold underline"
          href="https://vuejs.org/guide/components/provide-inject"
          target="_blank"
        >Provide/Inject Docs</a>
      </div>
    </ConnectPageSection>
  </div>
</template>
