<script setup lang="ts">
definePageMeta({
  layout: 'connect-auth',
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'LaunchDarkly Composable (typing)' }
  ]
})

const ld = useConnectLaunchDarkly()
const flagTypeInfered = ld.getFeatureFlag('flag-type-infered', { hello: 'world', foo: 'bar' })
const flagWithGeneric = ld.getFeatureFlag<{ hello: 'world', foo: 'bar' }>('flag-with-generic')
</script>
<template>
  <div class="my-10 flex flex-col gap-10">
    <div class="space-y-4">
      <h1>LaunchDarkly Composable (typing)</h1>
      <p>The composable in this layer overwrites the one from base with user and account context.</p>
      <p>The flag typing can be infered from a default value, or provided as a generic.</p>
    </div>
    <ConnectPageSection :heading="{ label: 'Type Infered From Default Value' }">
      <div class="p-10 flex flex-col gap-4">
        <p>The flag type will be infered from the default value provided.</p>
        <pre>const flagTypeInfered = ld.getFeatureFlag('flag-type-infered', { hello: 'world', foo: 'bar' })</pre>
        <span class="inline-flex"><pre class="font-bold text-black">flagTypeInfered.hello:</pre> {{ flagTypeInfered.hello }}</span>
        <span class="inline-flex"><pre class="font-bold text-black">flagTypeInfered.foo:</pre> {{ flagTypeInfered.foo }}</span>
      </div>
    </ConnectPageSection>
    
    <ConnectPageSection :heading="{ label: 'Provide Type by Generic' }">
      <div class="p-10 flex flex-col gap-4">
        <p>Without a default value, your flag or flag properties may be undefined.</p>
        <pre>const flagWithGeneric = ld.getFeatureFlag<{ hello: 'world', foo: 'bar' }>('flag-with-generic')</pre>
        <span class="inline-flex"><pre class="font-bold text-black">flagWithGeneric?.hello:</pre> {{ flagWithGeneric?.hello ?? 'undefined' }}</span>
        <span class="inline-flex"><pre class="font-bold text-black">flagWithGeneric?.foo:</pre> {{ flagWithGeneric?.foo ?? 'undefined' }}</span>
      </div>
    </ConnectPageSection>
  </div>
</template>