<script setup lang="ts">
import { ConnectAccountCreateName } from '#components'
import type { FormError } from '@nuxt/ui'

definePageMeta({ layout: 'connect-auth' })
useHead({ title: 'Account Name Input Example' })

const localePath = useLocalePath()
setBreadcrumbs([
  { to: localePath('/'), label: 'Examples' },
  { label: 'AccountNameInput' }
])

// Mock controls
const mockEnabled = ref(false)
const mockStatusCode = ref<204 | 200 | 500>(204)

// Expose statusCode (v-model) to the page for readout
const statusCode = computed((): number | undefined => {
  return mockEnabled.value ? mockStatusCode.value : undefined
})

// Mock Error message
const errorMessage = computed<FormError>(() => {
  if (!mockEnabled.value) {
    // In real mode, let the component manage its own error (keep undefined)
    return undefined
  }

  switch (mockStatusCode.value) {
    case 204:
      return undefined
    case 200:
      return { name: 'accountName', message: 'An account with this name already exists.' }
    case 500:
      return { name: 'accountName', message: 'Unable to validate account name. Please try again.' }
    default:
      return undefined
  }
})
</script>

<template>
  <div class="py-8 space-y-6">
    <h1>AccountNameInput</h1>

    <ConnectPageSection
      :heading="{ label: 'Example (login and API integration setup required)' }"
      ui-body="p-4 space-y-6"
    >
      <!-- Controls -->
      <div class="grid sm:grid-cols-3 gap-4">
        <div class="flex items-center gap-3">
          <UCheckbox v-model="mockEnabled" label="Mock mode" />
        </div>

        <div v-if="mockEnabled" class="flex items-center gap-3">
          <label class="text-sm w-28">Mock status</label>
          <USelect
            v-model="mockStatusCode"
            class="w-40"
            :items="[
              { label: 'Available (204)', value: 204 },
              { label: 'Unavailable (200)', value: 200 },
            ]"
            :disabled="!mockEnabled"
          />
        </div>
      </div>

      <!-- Focus area -->
      <ConnectTransitionCollapse>
        <div class="bg-shade p-5 space-y-5">
          <!-- Conditional rendering: mock vs real -->
          <ConnectAccountCreateName
            v-model:status-code="statusCode"
            :error="errorMessage"
          />
        </div>
      </ConnectTransitionCollapse>
    </ConnectPageSection>
  </div>
</template>
