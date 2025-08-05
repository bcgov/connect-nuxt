<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

definePageMeta({
  layout: 'connect-auth',
  breadcrumbs: [
    { label: 'Examples' }
  ]
})

const localePath = useLocalePath()
const goToExample = async (path: string) => await navigateTo(localePath(path))
const { isAuthenticated } = useConnectAuth()

const layoutExamples: DropdownMenuItem[] = [
  {
    label: 'Connect Pay Layout',
    onSelect: async () => await goToExample('/examples/layouts/ConnectPay')
  }
]

const componentExamples: DropdownMenuItem[] = [
  {
    label: 'Connect Fee (default)',
    onSelect: async () => await goToExample('/examples/components/ConnectFeeWidget/default')
  },
  {
    label: 'Connect Fee (extra fees)',
    onSelect: async () => await goToExample('/examples/components/ConnectFeeWidget/extraFees')
  },
  {
    label: 'Connect Fee (multiple fees)',
    onSelect: async () => await goToExample('/examples/components/ConnectFeeWidget/multipleFees')
  },
  {
    label: 'Connect Fee (quantity)',
    onSelect: async () => await goToExample('/examples/components/ConnectFeeWidget/quantity')
  },
  {
    label: 'Connect Fee (payment override)',
    onSelect: async () => await goToExample('/examples/components/ConnectFeeWidget/paymentOverride')
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
