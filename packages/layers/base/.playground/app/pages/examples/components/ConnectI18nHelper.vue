<script setup lang="ts">
definePageMeta({
  layout: 'connect-sidebar',
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'ConnectI18nHelper' }
  ]
})

const count = ref(0)

setInterval(() => {
  count.value = count.value += 1
}, 1000)
</script>

<template>
  <div class="flex flex-col gap-10">
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
        Any extra attributes passed to the component (like `:count`) are available to use in the translation string.
      </p>
      <ConnectI18nHelper translation-path="test.i18n.computed" :count />
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'With a different element (default span)' }" ui-body="p-4 space-y-4">
      <p>
        Customize the wrapper element. `as="h1"`
      </p>
      <ConnectI18nHelper
        translation-path="test.i18n.computed"
        :count
        as="h1"
      />
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Sanitized input' }" ui-body="p-4 space-y-4">
      <p>
        Text is sanitized to safely use user generated strings.
      </p>
      <p>
        translation path: `"This is &lt;strong&gt;safe bold text&lt;/strong&gt;,
        with a sanitized &lt;script&gt;alert('XSS')&lt;/script&gt; script element."`
      </p>
      <p>
        sanitized path: `"This is &lt;strong&gt;safe bold text&lt;/strong&gt;, with a sanitized script element."`
      </p>
      <ConnectI18nHelper translation-path="test.i18n.sanitized" />
    </ConnectPageSection>
  </div>
</template>
