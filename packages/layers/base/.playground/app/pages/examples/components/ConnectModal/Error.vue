<script setup lang="ts">
import { h } from 'vue'

definePageMeta({
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'Connect Modal Error' }
  ]
})

const { errorModal } = useConnectModal()

function openStatusExample(status?: number) {
  errorModal.open({
    error: { response: { status } },
    i18nPrefix: 'modal.error',
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

function openMessageExample() {
  errorModal.open({
    error: { response: { status: 400 }, message: 'API error message found' },
    i18nPrefix: 'modal.error',
    preferErrorMessage: true,
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

function openHelpExample() {
  errorModal.open({
    error: { response: { status: 400 } },
    i18nPrefix: 'modal.error',
    contactInfo: h('div', { class: 'p-10 bg-shade justify-center items-center' }, 'Contact Info Here'),
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
</script>

<template>
  <div class="flex flex-col gap-10">
    <h1>
      ConnectModalError
    </h1>

    <ConnectPageSection :heading="{ label: 'Props' }" ui-body="p-4 space-y-4">
      <ul>
        <li>`error` - unknown - required </li>
        <li>`i18nPrefix` - string - required </li>
        <li>`buttons` - ConnectModalButton[] - optional </li>
        <li>`contactInfo` - VNode - optional </li>
        <li>`preferErrorMessage` - boolean - optional </li>
      </ul>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Usage' }" ui-body="p-4 space-y-4">
      <code>
        const { errorModal } = useConnectModal()
        <br>
        errorModal.open({...props})
      </code>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: '400 Error' }" ui-body="p-4 space-y-4">
      <UButton label="Open with a 400 error" @click="openStatusExample(400)" />
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: '401 Error' }" ui-body="p-4 space-y-4">
      <UButton label="Open with a 401 error" @click="openStatusExample(401)" />
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Fallback Error Text' }" ui-body="p-4 space-y-4">
      <p>
        If a translation is not found matching the error status or the error status returns undefined,
        the title and description will use the "undefined" title and description.
      </p>
      <UButton label="Open with an error status not defined in the lang file" @click="openStatusExample(500)" />
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Error Message Example' }" ui-body="p-4 space-y-4">
      <p>
        Use the "preferErrorMessage" prop to use the error message found in the error object,
        if one can't be found, it will fallback to the text in the lang file.
      </p>
      <UButton label="Open Error Message" @click="openMessageExample" />
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Contact Info Example' }" ui-body="p-4 space-y-4">
      <p>
        Use the "contactInfo" prop with the render function from Vue to inject
        any help or contact information into the modal.
      </p>
      <UButton label="Open Contact Info" @click="openHelpExample" />
    </ConnectPageSection>
  </div>
</template>
