<script setup lang="ts">
definePageMeta({
  layout: 'connect-base'
})

const { getStoredFlag, getFeatureFlag, ldClient } = useConnectLaunchDarkly()

const test = getStoredFlag<{ something: 'text' }>('allowable-business-passcode-types')

watchEffect(async () => {
  // await ldClient.value?.waitUntilReady()
  console.log('TEST FLAG: ', test.value)
})
</script>

<template>
  <div>
    LaunchDarkly test page
    <UButton label="testing" />
  </div>
</template>
