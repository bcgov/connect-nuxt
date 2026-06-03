<script setup lang="ts">
import type { FormError, InputProps } from '@nuxt/ui'

defineProps<{
  error?: FormError<string>
}>()

const statusCode = defineModel<number | undefined>('statusCode')
const name = defineModel<string>('name')

const service = useConnectAuthService()

const isLoading = ref(false)

/* Validate accountName and trigger validation API call */
watchDebounced(
  name,
  async (v) => {
    if (v?.length) {
      isLoading.value = true
      try {
        const { status } = await service.verifyAccountName(v).catch(() => ({ status: undefined }))
        statusCode.value = status ?? 500 // fallback as undefined is not considered an exception
      } catch (err: unknown) {
        statusCode.value = getErrorStatus(err) ?? 500
      } finally {
        isLoading.value = false
      }
    } else {
      statusCode.value = undefined
    }
  },
  { debounce: 1000 }
)

// Compute UInput props based on loading state and status code
const uInputProps = computed<InputProps>(() => {
  const iconMap: Record<number, { class: string, name: string }> = {
    204: { class: 'text-success size-7', name: 'i-mdi-check' },
    200: { class: 'text-error size-7', name: 'i-mdi-close' },
    500: { class: 'text-error size-7', name: 'i-mdi-close' }
  }

  const icon = statusCode.value ? iconMap[statusCode.value] : null

  return {
    loading: isLoading.value,
    trailing: true,
    ui: {
      trailingIcon: icon?.class || 'text-primary size-7'
    },
    trailingIcon: icon?.name
  }
})

// Provide custom props for UInput
provide('UInput-props-account-name-input', uInputProps)
</script>

<template>
  <ConnectFormFieldWrapper
    :label="$t('connect.page.createAccount.accountNameLabel')"
    orientation="horizontal"
    :error
    padding-class="pt-6 pb-4 px-4 sm:pb-4 sm:pt-8 sm:px-8"
  >
    <ConnectFormInput
      v-model="name"
      name="accountName"
      input-id="account-name-input"
      :label="$t('connect.page.createAccount.accountNameLabel')"
      :help="$t('connect.page.createAccount.accountNameHelp')"
    />
  </ConnectFormFieldWrapper>
</template>
