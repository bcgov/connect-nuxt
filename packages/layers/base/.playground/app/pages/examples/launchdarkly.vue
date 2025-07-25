<script setup lang="ts">
definePageMeta({
  layout: 'connect-base'
})

const { getStoredFlag, getFeatureFlag } = useConnectLaunchDarkly()

// --- Scenario 1: Reactive Mode (Default) ---
// These return a `computed` ref. They will have a default value initially
// and then automatically update once the LD client is initialized.
const storedFlagReactive = getStoredFlag<string>('allowable-business-passcode-types', 'reactive-default')
const featureFlagReactive = getFeatureFlag<string>('allowable-business-passcode-types', 'reactive-default')

// --- Scenario 2: Await Mode ---
// We use refs to hold the data and a loading state for a better user experience.
const storedFlagAwait = ref<string>('Loading...')
const featureFlagAwait = ref<string>('Loading...')
// using top-level await prevents the page from being rendered until that is resolved
// using onMounted is not required
// this is required for test purposes to show that the reactive option returns the default value until LD is ready
onMounted(async () => {
  storedFlagAwait.value = await getStoredFlag<string>('allowable-business-passcode-types', 'await-default', 'await')
  featureFlagAwait.value = await getFeatureFlag<string>('allowable-business-passcode-types', 'await-default', 'await')
})

// This watcher will fire immediately and then again when the reactive flags update.
watchEffect(() => {
  console.info('--- Reactive Watcher ---')
  console.info('storedFlagReactive:', storedFlagReactive.value)
  console.info('featureFlagReactive:', featureFlagReactive.value)
  console.info('---------------------------------------------')
})

// This watcher will only fire once, after the LD client is fully ready.
// This may fire multiple times if the values resolve at different times
watchEffect(async () => {
  console.info('--- Await Watcher ---')
  console.info('Awaited Stored Flag:', storedFlagAwait.value)
  console.info('Awaited Feature Flag:', featureFlagAwait.value)
  console.info('------------------------------------------')
})
</script>

<template>
  <div class="p-8 space-y-6">
    <h1 class="text-2xl font-bold">
      LaunchDarkly Example Page
    </h1>

    <div class="p-4 border rounded-lg space-y-2">
      <h2 class="text-lg font-semibold">
        Reactive Mode
      </h2>
      <p>These values will start as defaults and then update automatically.</p>
      <div>
        <strong>Stored Flag (Reactive):</strong>
        <pre class="p-2 mt-1 bg-gray-100 rounded">{{ storedFlagReactive }}</pre>
      </div>
      <div>
        <strong>Feature Flag (Reactive):</strong>
        <pre class="p-2 mt-1 bg-gray-100 rounded">{{ featureFlagReactive }}</pre>
      </div>
    </div>

    <div class="p-4 border rounded-lg space-y-2">
      <h2 class="text-lg font-semibold">
        Await Mode
      </h2>
      <p>These values will show "Loading..." until the client is initialized and the promise resolves.</p>
      <div>
        <strong>Stored Flag (Await):</strong>
        <pre class="p-2 mt-1 bg-gray-100 rounded">{{ storedFlagAwait }}</pre>
      </div>
      <div>
        <strong>Feature Flag (Await):</strong>
        <pre class="p-2 mt-1 bg-gray-100 rounded">{{ featureFlagAwait }}</pre>
      </div>
    </div>
  </div>
</template>
