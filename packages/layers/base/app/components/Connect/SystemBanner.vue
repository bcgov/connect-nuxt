<script setup lang="ts">
const ld = useConnectLaunchDarkly()
const { $sanitize } = useNuxtApp()

const {
  dismissible = false,
  icon = 'i-mdi-information'
} = defineProps<{
  dismissible?: boolean
  icon?: string
}>()

const close = ref(false)
const message = ref('')
onMounted(async () => {
  message.value = $sanitize(await ld.getStoredFlag('banner-text', '', 'await'))
})
</script>

<template>
  <div id="connect-system-banner" class="bg-brand-inverted">
    <UAlert
      v-show="!!message && !close"
      class="py-0"
      :description="message"
      :close="dismissible"
      close-icon="i-mdi-close"
      :ui="{
        root: 'rounded-none bg-brand-inverted p-2 sm:px-4 app-inner-container',
        wrapper: 'bg-brand-inverted',
        close: 'mt-2 text-neutral-highlighted',
      }"
      @update:open="close = true"
    >
      <!-- dismissible ? { class: 'pr-2 text-neutral-highlighted' } : null -->
      <template #description>
        <div class="flex gap-2 items-center py-2">
          <UIcon class="size-7 shrink-0 text-neutral-highlighted self-start" :name="icon" />
          <!-- eslint-disable vue/no-v-html tailwindcss/no-custom-classname -->
          <p class="vhtml text-neutral-highlighted" v-html="message" />
        </div>
      </template>
    </UAlert>
  </div>
</template>

<!-- must style globally for vhtml style to work  -->
<style>
.vhtml > a {
  color: var(--ui-neutral-highlighted);
  text-decoration: underline;
}
</style>
