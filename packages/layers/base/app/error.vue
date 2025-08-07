<script setup lang="ts">
import type { NuxtError } from '#app'

const { t } = useI18n()
const localePath = useLocalePath()

const props = defineProps({
  error: { type: Object as () => NuxtError, default: undefined }
})

// TODO: update with other error codes?
const errorKey: string | number = props.error?.statusCode === 404 ? 404 : 'unknown'

// cant use definePageMeta in error.vue
useRoute().meta.hideBreadcrumbs = true

useHead({
  title: errorKey === 404 ? t('connect.page.error.404.title') : t('connect.page.error.unknown.title')
})

const errorObj = {
  name: props.error?.name || '',
  cause: props.error?.cause || '',
  message: props.error?.message || '',
  statusCode: props.error?.statusCode || '',
  statusMessage: props.error?.statusMessage || '',
  stack: props.error?.stack || '',
  data: props.error?.data || ''
}

onMounted(() => {
  console.error('Application Error: ', errorObj)
})
</script>

<template>
  <UApp :toaster="{ position: 'bottom-center' }">
    <NuxtLayout name="connect-base">
      <div class="m-auto flex flex-col items-center gap-4">
        <h1>
          {{ $t(`connect.page.error.${errorKey}.h1`) }}
        </h1>
        <p>{{ $t(`connect.page.error.${errorKey}.content`) }}</p>
        <UButton
          :label="$t('connect.label.goHome')"
          icon="i-mdi-home"
          size="xl"
          :to="localePath('/')"
        />
      </div>
    </NuxtLayout>
  </UApp>
</template>
