<script setup lang="ts">
const ld = useConnectLaunchDarkly()
// const { $sanitize } = useNuxtApp()

defineProps({
  dismissible: { type: Boolean, default: false },
  icon: { type: String, default: 'i-mdi-information' }
})

const close = ref(false)
const message = ld.getStoredFlag<string>('banner-text')
</script>

<template>
  <div class="bg-yellow-400">
    <UAlert
      v-show="!!message && !close"
      class="border-b-2 border-yellow-400 py-0"
      :description="message"
      :close="dismissible"
      close-icon="i-mdi-close"
      :ui="{
        root: 'rounded-none bg-yellow-400 p-0 app-inner-container',
        wrapper: 'bg-yellow-400',
        close: 'mt-2 text-gray-900'
      }"
      @update:open="close = true"
    >
      <!-- dismissible ? { class: 'pr-2 text-gray-900' } : null -->
      <template #description>
        <div class="flex gap-2 items-center py-2">
          <UIcon class="size-7 shrink-0 text-gray-900 self-start" :name="icon" />
          <!-- eslint-disable vue/no-v-html tailwindcss/no-custom-classname -->
          <p class="vhtml text-gray-900" v-html="message" />
        </div>
      </template>
    </UAlert>
  </div>
</template>
<!-- must style globally for vhtml style to work  -->
<style>
.vhtml > a {
  color: #212529;
  text-decoration: underline;
}
</style>