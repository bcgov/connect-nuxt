<script setup lang="ts">
import type { FormError, InputProps } from '@nuxt/ui'

defineProps<{
  error?: FormError<string>
}>()

const authApi = useAuthApi()
const { accountFormState } = useConnectAccountStore()

const isLoading = ref(false)
const statusCode = defineModel<number | undefined>('statusCode')

/** Validate accountName and trigger validation API call */
const validateName = useDebounceFn(async (accountName: string) => {
  if (accountName.length) {
    isLoading.value = true
    try {
      const { refetch } = authApi.verifyAccountName(accountName)
      const { data } = await refetch()
      statusCode.value = data?.status
    } catch (err: unknown) {
      statusCode.value = err?.response?.status || 500
    } finally {
      isLoading.value = false
    }
  } else {
    statusCode.value = undefined
  }
}, 1000)

watch(() => accountFormState.accountName, validateName)

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
    class="pt-2 my-6"
    :label="$t('connect.page.createAccount.accountNameLabel')"
    orientation="horizontal"
    :error
  >
    <ConnectFormInput
      v-model="accountFormState.accountName"
      name="accountName"
      input-id="account-name-input"
      :label="$t('connect.page.createAccount.accountNameLabel')"
      :help="$t('connect.page.createAccount.accountNameHelp')"
    />
  </ConnectFormFieldWrapper>
</template>
