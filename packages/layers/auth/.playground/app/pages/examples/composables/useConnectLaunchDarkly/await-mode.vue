<script setup lang="ts">
import { delay } from 'es-toolkit'

definePageMeta({
  layout: 'connect-auth',
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'LaunchDarkly Composable (await mode)' }
  ]
})

const ld = useConnectLaunchDarkly()
const flagSystemBanner = await ld.getFeatureFlag('banner-text', '', 'await')

const message = ref('Loading...')
onMounted(async () => {
  setTimeout(async () => {
    message.value = await ld.getFeatureFlag('onmounted-flag', 'Updated!', 'await')
  }, 5000)
})

const loading = ref(false)
const resolvedValue = ref('')
async function doSomething() {
  loading.value = true
  try {
    await delay(1000) // simulate delay
    resolvedValue.value = await ld.getFeatureFlag('in-function-flag', `${Math.random().toFixed(5)}`, 'await')
  } catch {
    // do something
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="my-10 flex flex-col gap-10">
    <div class="space-y-4">
      <h1>LaunchDarkly Composable (await mode)</h1>
      <p>The composable in this layer overwrites the one from base with user and account context.</p>
      <p>Await mode returns a promise that resolves with the final flag value once the client is ready.</p>
    </div>

    <ConnectPageSection :heading="{ label: 'Await in Page Setup' }">
      <div class="p-10 flex flex-col gap-4">
        <p>Using await at the setup route will block navigation until the promise is resolved.</p>
        <pre>const flagSystemBanner = await ld.getFeatureFlag('banner-text', '', 'await')</pre>
        <span>Flag value: {{ flagSystemBanner }}</span>
      </div>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Await in onMounted with Default Value' }">
      <div class="p-10 flex flex-col gap-4">
        <p>Add a default value to return while LaunchDarkly is initializing. Defaults to undefined.</p>
        <pre class="-ml-20">
          const message = ref('Loading...')
          onMounted(async () => {
            setTimeout(async () => {
              message.value = await ld.getFeatureFlag('onmounted-flag', 'Updated!', 'await')
            }, 5000)
          })
        </pre>
        <span>Ref set by awaited flag: {{ message }}</span>
      </div>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Await in function' }">
      <div class="p-10 flex flex-col gap-4">
        <p>Access a flag inside a function</p>
        <pre class="-ml-20">
          const loading = ref(false)
          const resolvedValue = ref('')
          async function doSomething () {
            loading.value = true
            try {
              await delay(1000) // simulate delay
              resolvedValue.value =
                await ld.getFeatureFlag('in-function-flag', `Resolved Value: ${Math.random().toFixed(5)}`, 'await')
            } catch {
              // do something
            } finally {
              loading.value = false
            }
          }
        </pre>
        <UButton
          label="Trigger"
          :loading
          @click="doSomething"
        />
        <span>Resolved Value: {{ resolvedValue }}</span>
      </div>
    </ConnectPageSection>
  </div>
</template>
