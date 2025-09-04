<script setup lang="ts">
import { delay } from 'es-toolkit'

definePageMeta({
  layout: 'connect-base'
})

const localePath = useLocalePath()
const { tombstone, $reset } = useConnectTombstone('initial-state', { title: { as: 'h2', text: 'Initial State Title' }})

async function triggerReset() {
  tombstone.value.loading = true
  await delay(1000)
  $reset()
  tombstone.value.loading = false
}

setBreadcrumbs([
  {
    to: localePath('/'),
    label: 'Examples'
  },
  {
    label: 'ConnectTombstone (Initial State)'
  }
])
</script>

<template>
  <div class="py-8 space-y-6">
    <h1>
      ConnectTombstone - Initial State
    </h1>

    <p>This component is meant to used with the useConnectTombstone composable.</p>
    <p>Pass an optional initial state to useConnectTombstone.</p>

    <ConnectPageSection :heading="{ label: 'Props' }" ui-body="p-4 space-y-4">
      <p>The `stateKey` prop is required to link the composable and component state.</p>
      <ul>
        <li>`stateKey` - String - required</li>
      </ul>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Initial State Example' }" ui-body="p-4 space-y-4">
      <UButton label="Show Loading State" @click="triggerReset" />
      <ConnectTombstone class="border border-black" state-key="initial-state" />
    </ConnectPageSection>
  </div>
</template>
