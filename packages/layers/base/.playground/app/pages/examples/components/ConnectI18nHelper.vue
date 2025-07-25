<script setup lang="ts">

definePageMeta({
  layout: 'connect-base'
})

const count = ref(0)

setInterval(() => {
  count.value = count.value+= 1
}, 1000)
</script>

<template>
  <div class="py-8 space-y-6">
    <h1>
      ConnectI18nHelper
    </h1>

    <ConnectPageSection :heading="{ label: 'With Bold Text' }" ui-body="p-4 space-y-4">
      <p>
        The component automatically replaces `{boldStart}` and `{boldEnd}` with `&lt;strong&gt;` tags.
      </p>
      <ConnectI18nHelper translation-path="test.i18n.strong" />
    </ConnectPageSection>
    
    <ConnectPageSection :heading="{ label: 'With Italic Text' }" ui-body="p-4 space-y-4">
      <p>
        The component automatically replaces `{italicStart}` and `{italicEnd}` with `&lt;em&gt;` tags.
      </p>
      <ConnectI18nHelper translation-path="test.i18n.italic" />
    </ConnectPageSection>
    
    <ConnectPageSection :heading="{ label: 'With Custom Props' }" ui-body="p-4 space-y-4">
      <p>
        Any extra attributes passed to the component (like `:count`) are available for interpolation in the translation string.
      </p>
      <ConnectI18nHelper translation-path="test.i18n.computed" :count />
    </ConnectPageSection>
  </div>
</template>