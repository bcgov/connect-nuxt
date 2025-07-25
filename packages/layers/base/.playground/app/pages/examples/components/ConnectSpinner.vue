<script setup lang="ts">
definePageMeta({
  layout: 'connect-base'
})

const fullscreen = ref(false)

function setFullscreen() {
  fullscreen.value = !fullscreen.value
}

defineShortcuts({
  escape: () => {
    setFullscreen()
  }
})
</script>

<template>
  <div class="py-8 space-y-6">
    <h1>
      ConnectSpinner
    </h1>

    <ConnectPageSection :heading="{ label: 'Props' }" ui-body="p-4 space-y-4">
      <ul>
        <li>fullscreen - boolean - optional</li>
        <li>size - number - default: 75</li>
      </ul>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Inside a container' }" ui-body="p-4 space-y-4">
      <p>
        The spinner will center itself inside a container. It is required to add `position: relative` on the parent.
      </p>
      <div class="relative h-40">
        <ConnectSpinner />
      </div>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Custom Size' }" ui-body="p-4 space-y-4">
      <p>Change the size of the spinner by using the `size` property.</p>
      <div class="relative h-40">
        <ConnectSpinner :size="25" />
      </div>
    </ConnectPageSection>

    <ConnectPageSection
      :heading="{ label: 'Fullscreen' }"
      ui-body="p-4 space-y-4"
      :actions="[{ label: 'Enter Fullscreen', onClick: setFullscreen }]"
    >
      <p>Use the fullscreen property to have a spinner and overlay the full viewport.</p>
      <strong>Press the escape key to exit fullscreen mode. (demo only)</strong>
      <div class="relative h-40">
        <ConnectSpinner :fullscreen="fullscreen" />
      </div>
    </ConnectPageSection>
  </div>
</template>
