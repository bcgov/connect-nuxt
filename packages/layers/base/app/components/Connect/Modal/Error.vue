<script setup lang="ts">
import type { VNode } from 'vue'
// https://vue-i18n.intlify.dev/api/composition.html#te-key-locale
const { t, te } = useI18n()

interface ErrorModalProps {
  error: unknown
  i18nPrefix: string
  buttons?: ConnectModalButton[]
  contactInfo?: VNode
  preferErrorMessage?: boolean
}

const {
  error,
  i18nPrefix,
  buttons = [
    { label: useNuxtApp().$i18n.t('label.close'), shouldClose: true }
  ],
  preferErrorMessage = false
} = defineProps<ErrorModalProps>()
defineEmits<{ close: [] }>()

const status = getErrorStatus(error)
const message = getErrorMessage(error)

const titleKey = `${i18nPrefix}.${status}.title`
const descKey = `${i18nPrefix}.${status}.description`

const title = te(titleKey) ? t(titleKey) : t(`${i18nPrefix}.undefined.title`)
const i18nDescription = te(descKey) ? t(descKey) : t(`${i18nPrefix}.undefined.description`)

const description = (preferErrorMessage && message)
  ? message
  : i18nDescription
</script>

<template>
  <UModal
    id="connect-error-modal"
    overlay
    :title
    :description
    :dismissible="false"
  >
    <template #content>
      <div class="p-10 flex flex-col gap-6">
        <h2 class="text-2xl font-semibold text-neutral-highlighted">
          {{ title }}
        </h2>
        <p>{{ description }}</p>
        <component :is="contactInfo" v-if="contactInfo" />
        <div class="flex flex-wrap items-center justify-center gap-4">
          <template
            v-for="button in buttons"
            :key="button.label"
          >
            <UButton
              v-if="button.shouldClose"
              v-bind="button"
              size="xl"
              class="w-full justify-center sm:w-min sm:justify-normal"
              @click="$emit('close')"
            />
            <UButton
              v-else
              v-bind="button"
              size="xl"
              class="w-full justify-center sm:w-min sm:justify-normal"
            />
          </template>
        </div>
      </div>
    </template>
  </UModal>
</template>
