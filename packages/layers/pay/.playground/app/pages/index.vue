<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

definePageMeta({
  layout: 'connect-auth',
  breadcrumbs: [
    { label: 'Examples' }
  ]
})

const localePath = useLocalePath()
const { isAuthenticated } = useConnectAuth()

const layoutExamples: DropdownMenuItem[] = [
  {
    label: 'Connect Pay Layout',
    to: localePath('/examples/layouts/ConnectPay')
  }
]

const componentExamples: DropdownMenuItem[] = [
  {
    label: 'Connect Fee (default)',
    to: localePath('/examples/components/ConnectFeeWidget/default')
  },
  {
    label: 'Connect Fee (multiple fees)',
    to: localePath('/examples/components/ConnectFeeWidget/multipleFees')
  },
  {
    label: 'Connect Fee (quantity)',
    to: localePath('/examples/components/ConnectFeeWidget/quantity')
  },
  {
    label: 'Connect Fee (extra fees)',
    to: localePath('/examples/components/ConnectFeeWidget/extraFees')
  },
  {
    label: 'Connect Fee (payment override)',
    to: localePath('/examples/components/ConnectFeeWidget/paymentOverride')
  }
]

onMounted(() => {
  useConnectFeeStore().$reset()
})
</script>

<template>
  <div class="my-10 space-y-5">
    <h1>Connect Pay Layer Examples</h1>
    <div class="flex gap-3 max-w-[300px]">
      <UDropdownMenu
        :disabled="!isAuthenticated"
        :items="layoutExamples"
        :content="{ align: 'start' }"
      >
        <UButton
          label="Layout Examples"
          icon="i-lucide-menu"
          color="neutral"
          variant="outline"
        />
      </UDropdownMenu>
      <UDropdownMenu
        :disabled="!isAuthenticated"
        :items="componentExamples"
        :content="{ align: 'start' }"
      >
        <UButton
          label="Component Examples"
          icon="i-lucide-menu"
          color="neutral"
          variant="outline"
        />
      </UDropdownMenu>
    </div>
    <p v-if="!isAuthenticated" class="text-error">
      All Payment examples require a logged in user. Please login before selecting an example.
    </p>
  </div>
</template>
