<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  layout: 'connect-auth',
  alias: ['/auth/account/create'],
  middleware: 'connect-auth'
})

const route = useRoute()
const rtc = useRuntimeConfig().public
const store = useConnectAccountStore()
const { authUser } = useConnectAuth()
const { finalRedirect } = useConnectAccountFlowRedirect()
const mutate = useConnectAuthMutation()
const { mutateAsync: createAccount } = mutate.createAccount()
const { mutateAsync: updateContact } = mutate.updateOrCreateUserContact()

const isSubmitting = ref(false)
const addNew = ref(false)

const showAccountList = computed(() => !addNew.value)
const pageTitle = computed(() =>
  showAccountList.value
    ? $t('connect.label.existingAccountFound')
    : $t('connect.label.sbcAccountCreation')
)

useHead({
  title: pageTitle
})

function selectAndRedirect(id: number) {
  store.switchCurrentAccount(id)
  return finalRedirect(route)
}

async function onSubmitCreateAccount(e: FormSubmitEvent<AccountProfileSchema>) {
  const isFirstAccount = store.userAccounts.length === 0
  const contactMethod = isFirstAccount ? 'POST' : 'PUT' // if 0 accounts the contact is new

  try {
    isSubmitting.value = true
    const { accountPayload, contactPayload } = formatCreateAccountPayload(e.data)
    const res = await createAccount({ payload: accountPayload, silent: true })
    await store.setAccountInfo(true)
    await updateContact({
      payload: contactPayload,
      silent: true,
      method: contactMethod
    }).catch() // swallow errors from contact update, account was created and user can proceed
    return selectAndRedirect(res.id)
  } catch {
    useConnectAuthModals().openCreateAccountModal()
    isSubmitting.value = false
  }
}

onBeforeMount(() => {
  const isBcscNoAccounts = store.userAccounts.length === 0 && authUser.value.loginSource === ConnectLoginSource.BCSC
  const isCreatePath = route.path.includes('create')

  if (isBcscNoAccounts || isCreatePath) {
    addNew.value = true
  }
})
</script>

<template>
  <UContainer class="max-w-6xl">
    <ConnectTransitionFade>
      <div class="space-y-6 sm:space-y-10">
        <h1>{{ pageTitle }}</h1>
        <ConnectAccountExistingAlert v-if="showAccountList" />
      </div>
    </ConnectTransitionFade>

    <ConnectTransitionFade>
      <ConnectAccountExistingList
        v-if="showAccountList"
        :accounts="store.userAccounts"
        @select="selectAndRedirect"
      />

      <ConnectAccountCreate
        v-else
        @submit="onSubmitCreateAccount"
      />
    </ConnectTransitionFade>

    <!-- Select Account Actions -->
    <div
      v-if="showAccountList"
      class="flex justify-center"
      data-testid="select-account-button-wrapper"
    >
      <UButton
        v-if="authUser.loginSource === ConnectLoginSource.BCSC"
        variant="outline"
        :label="$t('connect.label.createNewAccount')"
        icon="i-mdi-chevron-right"
        trailing
        size="xl"
        class="w-full justify-center sm:w-min sm:justify-normal"
        @click="addNew = true"
      />
      <UButton
        v-else
        variant="outline"
        :label="$t('connect.label.createNewAccount')"
        icon="i-mdi-chevron-right"
        trailing
        size="xl"
        class="w-full justify-center sm:w-min sm:justify-normal"
        external
        :to="rtc.authWebUrl + 'setup-account'"
      />
    </div>

    <!-- Create Account Actions -->
    <div
      v-if="!showAccountList"
      class="flex justify-end gap-x-3"
      data-testid="create-account-button-wrapper"
    >
      <UButton
        variant="outline"
        :label="$t('connect.label.back')"
        :disabled="isSubmitting"
        trailing
        size="xl"
        class="w-full justify-center sm:w-min sm:justify-normal"
        @click="addNew = false"
      />
      <UButton
        :label="$t('connect.label.saveAndContinue')"
        :loading="isSubmitting"
        form="account-create-form"
        class="w-full justify-center sm:w-min sm:justify-normal"
        trailing
        type="submit"
        size="xl"
      />
    </div>
  </UContainer>
</template>
