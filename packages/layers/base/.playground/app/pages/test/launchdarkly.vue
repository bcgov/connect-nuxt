<script setup lang="ts">
definePageMeta({
  layout: 'connect-base'
})

const { getStoredFlag, getFeatureFlag } = useConnectLaunchDarkly()

// --- Scenario 1: Reactive Mode (Default) ---
// These return a `computed` ref. They will have a default value initially
// and then automatically update once the LD client is initialized.
const storedFlagReactive = getStoredFlag<string>('allowable-business-passcode-types', 'Loading...')
const featureFlagReactive = getFeatureFlag<string>('allowable-business-passcode-types', 'Loading...')

// --- Scenario 2: Await Mode ---
// We use refs to hold the data and a loading state for a better user experience.
const storedFlagAwait = await getStoredFlag<string>('allowable-business-passcode-types', 'await-default', 'await')
const featureFlagAwait = await getFeatureFlag<string>('allowable-business-passcode-types', 'await-default', 'await')

// This watcher will fire immediately and then again when the reactive flags update.
watchEffect(() => {
  console.info('--- Reactive Watcher (Fires multiple times) ---')
  console.info('storedFlagReactive:', storedFlagReactive.value)
  console.info('featureFlagReactive:', featureFlagReactive.value)
  console.info('---------------------------------------------')
})

// This watcher will only fire once, after the LD client is fully ready.
watchEffect(async () => {
  console.info('--- Await Watcher (Fires once when ready) ---')
  console.info('Awaited Stored Flag:', storedFlagAwait)
  console.info('Awaited Feature Flag:', featureFlagAwait)
  console.info('------------------------------------------')
})
</script>

<template>
  <div class="p-8 space-y-6">
    <h1 class="text-2xl font-bold">
      LaunchDarkly Test Page
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
