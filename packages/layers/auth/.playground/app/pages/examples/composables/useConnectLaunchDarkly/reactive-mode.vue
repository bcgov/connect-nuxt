<script setup lang="ts">
definePageMeta({
  layout: 'connect-auth',
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'LaunchDarkly Composable (reactive mode)' }
  ]
})

const ld = useConnectLaunchDarkly()
const flagUserContext = ld.getFeatureFlag('test-user-context-switching', false)
const flagNonExistentWithDefault = ld.getFeatureFlag('non-existent-flag', 'Default value here.')
const flagNonExistentWithoutDefault = ld.getFeatureFlag('non-existent-flag')
</script>

<template>
  <div class="my-10 flex flex-col gap-10">
    <div class="space-y-4">
      <h1>LaunchDarkly Composable (reactive mode)</h1>
      <p>The composable in this layer overwrites the one from base with user and account context.</p>
      <p>Reactive mode returns a computed value that will update when the flags change.</p>
      <p>
        You can test this by adding your user or account to the `test-user-context-switching`
        flag rules in the `entity-ui` project.
      </p>
    </div>
    <ConnectPageSection :heading="{ label: 'User Context Changes' }">
      <div class="p-10 flex flex-col gap-4">
        <pre>const flagUserContext = ld.getFeatureFlag('test-user-context-switching')</pre>
        <span>Flag value: {{ flagUserContext }}</span>
      </div>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Default or Fallback value' }">
      <div class="p-10 flex flex-col gap-4">
        <p>Add a default value to return while LaunchDarkly is initializing. Defaults to undefined.</p>
        <pre>const flagNonExistentWithDefault = ld.getFeatureFlag('non-existent-flag', 'Default value here.')</pre>
        <span>Flag value with default: {{ flagNonExistentWithDefault ?? 'undefined' }}</span>
        <pre>const flagNonExistentWithoutDefault = ld.getFeatureFlag('non-existent-flag')</pre>
        <span>Flag value without default: {{ flagNonExistentWithoutDefault ?? 'undefined' }}</span>
      </div>
    </ConnectPageSection>
  </div>
</template>
