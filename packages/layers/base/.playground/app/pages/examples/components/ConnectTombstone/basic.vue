<script setup lang="ts">
import { delay } from 'es-toolkit'

definePageMeta({
  layout: 'connect-base'
})

const localePath = useLocalePath()
const { tombstone } = useConnectTombstone('basic')

async function triggerReset() {
  tombstone.value.loading = true
  await delay(1000)
  tombstone.value.title = { as: 'span', text: 'Basic Title Here' }
  tombstone.value.subtitles = [{ text: 'BC Cooperative Association' }]
  tombstone.value.sideDetails = [
    { label: 'Business Number', value: '609760293752375' },
    { label: 'Incorporation Number', value: 'BC1234567' },
    { label: 'Email', value: 'email@example.com' },
    { label: 'Phone', value: '250-123-4567' }
  ]
  tombstone.value.loading = false
}

onMounted(async () => {
  await triggerReset()
})

setBreadcrumbs([
  {
    to: localePath('/'),
    label: 'Examples'
  },
  {
    label: 'ConnectTombstone (basic)'
  }
])
</script>

<template>
  <div class="py-8 space-y-6">
    <h1>
      ConnectTombstone - Basic
    </h1>

    <p>This component is meant to used with the useConnectTombstone composable.</p>

    <ConnectPageSection :heading="{ label: 'Props' }" ui-body="p-4 space-y-4">
      <p>The `stateKey` prop is required to link the composable and component state.</p>
      <ul>
        <li>`stateKey` - String - required</li>
      </ul>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Basic Example' }" ui-body="p-4 space-y-4">
      <UButton label="Show Loading State" @click="triggerReset" />
      <ConnectTombstone class="border border-black" state-key="basic" />
    </ConnectPageSection>
  </div>
</template>
