<script setup lang="ts">
definePageMeta({
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'Connect Modal' }
  ]
})

const { baseModal } = useConnectModal()

function openBasicExample() {
  baseModal.open({
    title: 'Modal Title',
    description: 'Modal description',
    dismissible: false,
    buttons: [
      {
        label: 'Close', variant: 'outline', shouldClose: true
      },
      {
        label: 'Trigger Alert', onClick: () => window.alert('Alert from modal!')
      }
    ]
  })
}

function openButtonExample() {
  baseModal.open({
    title: 'Modal Title',
    description: 'Modal description',
    dismissible: true,
    buttons: [
      {
        size: 'xl', label: 'Close', variant: 'outline', shouldClose: true, icon: 'i-mdi-home'
      },
      {
        size: 'xs', label: 'With Link', to: 'https://dev.bcregistry.gov.bc.ca', target: '_blank', external: true
      }
    ]
  })
}
</script>

<template>
  <div class="flex flex-col gap-10">
    <h1>
      ConnectModal
    </h1>

    <ConnectPageSection :heading="{ label: 'Props' }" ui-body="p-4 space-y-4">
      <ul>
        <li>`title` - string - required </li>
        <li>`description` - string - required </li>
        <li>`dismissable` - boolean - required </li>
        <li>`buttons` - ConnectModalButton[] - optional </li>
      </ul>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Usage' }" ui-body="p-4 space-y-4">
      <code>
        const { baseModal } = useConnectModal()
        <br>
        baseModal.open({...props})
      </code>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Basic Props' }" ui-body="p-4 space-y-4">
      <UButton label="Open with basic props" @click="openBasicExample" />
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Button Props' }" ui-body="p-4 space-y-4">
      <p>Pass any UButton props to :buttons</p>
      <UButton label="Open with Button Props" @click="openButtonExample" />
    </ConnectPageSection>
  </div>
</template>
