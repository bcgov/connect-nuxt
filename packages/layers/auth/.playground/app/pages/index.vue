<script setup lang="ts">
import { delay } from 'es-toolkit'
import type { DropdownMenuItem } from '@nuxt/ui'

definePageMeta({
  layout: 'connect-auth',
  onAccountChange: (oldAccount, newAccount) => {
    console.info('Old Account: ', oldAccount.label)
    console.info('New Account: ', newAccount.label)
    return true
  },
  breadcrumbs: [
    { label: 'Examples' }
  ]
})

const localePath = useLocalePath()

setOnBeforeSessionExpired(async () => {
  console.info('Starting onBeforeSessionExpired promise')
  await delay(3000)
  console.info('onBeforeSessionExpired promise fulfilled')
})

const composableExamples: DropdownMenuItem[] = [
  {
    label: 'LaunchDarkly (typing)',
    to: localePath('/examples/composables/useConnectLaunchDarkly/typing')
  },
  {
    label: 'LaunchDarkly (reactive-mode)',
    to: localePath('/examples/composables/useConnectLaunchDarkly/reactive-mode')
  },
  {
    label: 'LaunchDarkly (await-mode)',
    to: localePath('/examples/composables/useConnectLaunchDarkly/await-mode')
  }
]

const componentExamples: DropdownMenuItem[] = [
  {
    label: 'Account Name',
    to: localePath('/examples/components/Account/Create/name')
  }
]

const pageExamples: DropdownMenuItem[] = [
  {
    label: 'Login',
    to: localePath('/examples/pages/login?preset=defaultUser')
  },
  {
    label: 'Login - Colin User',
    to: localePath('/examples/pages/login?preset=bcscUser')
  },
  {
    label: 'Account Select/Create',
    to: localePath('/examples/pages/account/select')
  }
]
</script>

<template>
  <div class="my-10 space-y-5">
    <h1>Connect Auth Layer Examples</h1>
    <div class="flex gap-3 max-w-[300px]">
      <UDropdownMenu
        :items="composableExamples"
        :content="{ align: 'start' }"
      >
        <UButton
          label="Composable Examples"
          icon="i-lucide-menu"
          color="neutral"
          variant="outline"
        />
      </UDropdownMenu>

      <UDropdownMenu
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

      <UDropdownMenu
        :items="pageExamples"
        :content="{ align: 'start' }"
      >
        <UButton
          label="Page Examples"
          icon="i-lucide-menu"
          color="neutral"
          variant="outline"
        />
      </UDropdownMenu>
    </div>
  </div>
</template>
