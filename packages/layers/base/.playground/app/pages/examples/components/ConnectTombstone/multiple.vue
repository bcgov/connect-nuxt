<script setup lang="ts">
import { delay } from 'es-toolkit'

definePageMeta({
  layout: 'connect-base'
})

const localePath = useLocalePath()
const tombstone1 = useConnectTombstone('no-1')
const tombstone2 = useConnectTombstone('no-2')

async function trigger1() {
  tombstone1.value.loading = true
  await delay(1000)
  tombstone1.value.title = { el: 'span', text: 'First Tombstone Here' }
  tombstone1.value.subtitles = [{ text: 'BC Cooperative Association' }]
  tombstone1.value.sideDetails = [
    { label: 'Business Number', value: '609760293752375' },
    { label: 'Incorporation Number', value: 'BC1234567' },
    { label: 'Email', value: 'email@example.com' },
    { label: 'Phone', value: '250-123-4567' }
  ]
  tombstone1.value.loading = false
}

async function trigger2() {
  tombstone2.value.loading = true
  await delay(1000)
  tombstone2.value.title = { el: 'span', text: 'Second Tombstone Here' }
  tombstone2.value.subtitles = [{ text: 'BC Cooperative Association' }]
  tombstone2.value.sideDetails = [
    { label: 'Business Number', value: '609760293752375' },
    { label: 'Incorporation Number', value: 'BC1234567' },
    { label: 'Email', value: 'email@example.com' },
    { label: 'Phone', value: '250-123-4567' }
  ]
  tombstone2.value.loading = false
}

onMounted(async () => {
  await trigger1()
  await trigger2()
})

setBreadcrumbs([
  {
    to: localePath('/'),
    label: 'Examples'
  },
  {
    label: 'ConnectTombstone (multiple)'
  }
])
</script>

<template>
  <div class="py-8 space-y-6">
    <h1>
      ConnectTombstone - Basic
    </h1>

    <p>This component is meant to used with the useConnectTombstone composable.</p>
    <p>Pass the `state-key` props to have multiple tombstones active</p>

    <ConnectPageSection :heading="{ label: 'Multiple Example' }" ui-body="p-4 space-y-4">
      <div class="flex gap-4">
        <UButton label="Show Loading State 1" @click="trigger1" />
        <UButton label="Show Loading State 2" @click="trigger2" />
      </div>
      <ConnectTombstone class="border border-black" state-key="no-1" />
      <ConnectTombstone class="border border-black" state-key="no-2" />
    </ConnectPageSection>
  </div>
</template>
