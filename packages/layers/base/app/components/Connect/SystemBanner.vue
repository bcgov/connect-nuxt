<script setup lang="ts">
const ld = useConnectLaunchDarkly()
const { $sanitize } = useNuxtApp()

defineProps({
  dismissible: { type: Boolean, default: false },
  icon: { type: String, default: 'i-mdi-information' }
})

const close = ref(false)
const message = ref('')
onMounted(async () => {
  message.value = $sanitize(await ld.getStoredFlag('banner-text', '', 'await'))
})
</script>

<template>
  <div class="bg-brandLight px-2">
    <UAlert
      v-show="!!message && !close"
      class="py-0"
      :description="message"
      :close="dismissible"
      close-icon="i-mdi-close"
      :ui="{
        root: 'rounded-none bg-brandLight p-0 app-inner-container',
        wrapper: 'bg-brandLight',
        close: 'mt-2 text-neutralDark',
      }"
      @update:open="close = true"
    >
      <!-- dismissible ? { class: 'pr-2 text-neutralDark' } : null -->
      <template #description>
        <div class="flex gap-2 items-center py-2">
          <UIcon class="size-7 shrink-0 text-neutralDark self-start" :name="icon" />
          <!-- eslint-disable vue/no-v-html tailwindcss/no-custom-classname -->
          <p class="vhtml text-neutralDark" v-html="message" />
        </div>
      </template>
    </UAlert>
  </div>
</template>

<!-- must style globally for vhtml style to work  -->
<style>
.vhtml > a {
  color: var(--ui-neutralDark);
  text-decoration: underline;
}
</style>
