<script setup lang="ts">
import { delay } from 'es-toolkit'

definePageMeta({
  layout: 'connect-sidebar',
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'Connect Tombstone (slots)' }
  ]
})

const { tombstone } = useConnectTombstone('slots')

async function triggerReset() {
  tombstone.value.loading = true
  await delay(1000)
  tombstone.value.title = { as: 'span', text: 'Full Title Here' }
  tombstone.value.subtitles = [{ text: 'BC Cooperative Association' }]
  tombstone.value.details = [
    { badge: { label: 'BADGE' } },
    { text: 'Expiry Date: 06-12-2025', icon: { name: 'i-mdi-information-outline' } },
    { link: { label: 'Render a link', class: 'cursor-pointer' } }
  ]
  tombstone.value.sideDetails = [
    { label: 'Business Number', value: '609760293752375' },
    { label: 'Incorporation Number', value: 'BC1234567' },
    { label: 'Email', value: 'email@example.com' },
    { label: 'Phone', value: '250-123-4567' }
  ]
  tombstone.value.bottomButtons = [
    {
      button: {
        onClick: async () => {
          await delay(1500)
          window.alert('Certificate Downloaded!')
        },
        label: 'Download Certificate',
        icon: 'i-mdi-file-download-outline',
        size: 'sm'
      }
    },
    {
      button: {
        onClick: async () => {
          await delay(1500)
          window.alert('Reciept Downloaded!')
        },
        label: 'Download receipt',
        icon: 'i-mdi-file-download-outline',
        size: 'sm',
        variant: 'outline'
      }
    }
  ]
  tombstone.value.loading = false
}

onMounted(async () => {
  await triggerReset()
})
</script>

<template>
  <div class="flex flex-col gap-8">
    <h1>
      ConnectTombstone - Slots
    </h1>

    <p>This component is meant to used with the useConnectTombstone composable.</p>
    <p>
      Use slots to customize any section, sections not using slots will use the state provided by useConnectTombstone.
    </p>

    <ConnectPageSection :heading="{ label: 'Props' }" ui-body="p-4 space-y-4">
      <p>The `stateKey` prop is required to link the composable and component state.</p>
      <ul>
        <li>`stateKey` - String - required</li>
      </ul>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Title Slot' }" ui-body="p-4 space-y-4">
      <UButton label="Trigger Reset" @click="triggerReset" />
      <ConnectTombstone class="border border-black" state-key="slots">
        <template #title>
          <div class="border border-black h-10 flex justify-center items-center">
            Title Slot
          </div>
        </template>
      </ConnectTombstone>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Subtitles Slot' }" ui-body="p-4 space-y-4">
      <UButton label="Trigger Reset" @click="triggerReset" />
      <ConnectTombstone class="border border-black" state-key="slots">
        <template #subtitles>
          <div class="border border-black h-10 flex justify-center items-center">
            Subtitles Slot
          </div>
        </template>
      </ConnectTombstone>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Details Slot' }" ui-body="p-4 space-y-4">
      <UButton label="Trigger Reset" @click="triggerReset" />
      <ConnectTombstone class="border border-black" state-key="slots">
        <template #details>
          <div class="border border-black h-10 flex justify-center items-center">
            Details Slot
          </div>
        </template>
      </ConnectTombstone>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Buttons Slot' }" ui-body="p-4 space-y-4">
      <UButton label="Trigger Reset" @click="triggerReset" />
      <ConnectTombstone class="border border-black" state-key="slots">
        <template #buttons>
          <div class="border border-black h-10 flex justify-center items-center">
            Buttons Slot
          </div>
        </template>
      </ConnectTombstone>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Side Details Slot' }" ui-body="p-4 space-y-4">
      <UButton label="Trigger Reset" @click="triggerReset" />
      <ConnectTombstone class="border border-black" state-key="slots">
        <template #sideDetails>
          <div class="border border-black p-10 flex justify-center items-center">
            Side Details Slot
          </div>
        </template>
      </ConnectTombstone>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Loading Slot' }" ui-body="p-4 space-y-4">
      <UButton label="Trigger Reset" @click="triggerReset" />
      <ConnectTombstone class="border border-black" state-key="slots">
        <template #loading>
          <div class="border border-black p-10 flex w-full justify-center items-center relative">
            Loading Slot
            <ConnectSpinner />
          </div>
        </template>
      </ConnectTombstone>
    </ConnectPageSection>
  </div>
</template>
