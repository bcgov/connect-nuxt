<script setup lang="ts">
import { ConnectTermsOfUseContent, ConnectTermsOfUseForm } from '#components'

const { t } = useI18n()
const authApi = useAuthApi()
const { finalRedirect } = useConnectAccountFlowRedirect()

definePageMeta({
  layout: 'connect-auth',
  hideBreadcrumbs: true,
  middleware: 'connect-auth',
  connectTosPage: true
})

useHead({
  title: t('connect.page.termsOfUse.title')
})

const { data, status } = await authApi.getTermsOfUse()
const { patchTermsOfUse, isLoading } = authApi.usePatchTermsOfUse()

const formRef = useTemplateRef<InstanceType<typeof ConnectTermsOfUseForm>>('form-ref')
const contentRef = useTemplateRef<InstanceType<typeof ConnectTermsOfUseContent>>('content-ref')

// track if user has scrolled to bottom of page
const { bottom: tosBottom } = useElementBounding(contentRef)
const { top: formTop } = useElementBounding(formRef)
const hasReachedBottom = computed(() => formTop.value >= tosBottom.value)

const disableButtons = computed<boolean>(() => {
  return isLoading.value || status.value === 'pending' || status.value === 'error' || !data.value?.content
})

// TODO: - FUTURE - add help/contact info to alert?
</script>

<template>
  <UContainer
    class="max-w-6xl relative grow flex flex-col"
  >
    <h1 class="sticky top-0 w-full border-b border-line bg-shade pb-2 pt-4 text-center z-10 inset-x-0">
      {{ $t('connect.page.termsOfUse.h1') }}
    </h1>

    <div class="relative grow flex flex-col justify-center">
      <ConnectSpinner v-if="status === 'pending'" />

      <UAlert
        v-else-if="status === 'error'"
        icon="i-mdi-alert"
        :title="$t('connect.text.alertUnableToLoadTermsOfUse')"
        color="error"
        variant="subtle"
        :close-button="null"
        :ui="{ title: 'text-base' }"
      />

      <ConnectTermsOfUseContent
        v-else
        ref="content-ref"
        :content="data?.content"
      />
    </div>

    <ConnectTermsOfUseForm
      ref="form-ref"
      :disable-buttons="disableButtons"
      :has-reached-bottom="hasReachedBottom"
      :loading="isLoading"
      @submit="patchTermsOfUse({
        accepted: true,
        version: data!.versionId,
        successCb: async () => await finalRedirect(useRoute(), true),
      })"
    />
  </UContainer>
</template>
