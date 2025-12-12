<script setup lang="ts">
definePageMeta({
  layout: 'connect-auth',
  alias: ['/auth/account/create'],
  middleware: 'connect-auth'
})

const rtc = useRuntimeConfig().public
const accountStore = useConnectAccountStore()
const { authUser } = useConnectAuth()
const { finalRedirect } = useConnectAccountFlowRedirect()
const { clearAccountState } = useConnectAccountStore()

const addNew = ref(false)

useHead({
  title: !addNew.value ? $t('connect.label.existingAccountFound') : $t('connect.label.sbcAccountCreation')
})

function selectAndRedirect(id: number) {
  accountStore.switchCurrentAccount(id)
  finalRedirect(useRoute())
}

onBeforeMount(() => {
  if (accountStore.userAccounts.length === 0 && authUser.value.loginSource === ConnectLoginSource.BCSC) {
    addNew.value = true
  }
})

const toggleCreateNewAccount = () => {
  addNew.value = !addNew.value
  clearAccountState()
}
</script>

<template>
  <UContainer class="max-w-6xl">
    <ConnectTransitionFade>
      <div class="space-y-6 sm:space-y-10">
        <h1>{{ !addNew ? $t('connect.label.existingAccountFound') : $t('connect.label.sbcAccountCreation') }}</h1>
        <p v-if="addNew">
          {{ $t('connect.label.createNewAccountCont') }}
        </p>
        <ConnectAccountExistingAlert v-if="!addNew" />
      </div>
    </ConnectTransitionFade>

    <ConnectTransitionFade>
      <ConnectAccountExistingList
        v-if="addNew === false"
        :accounts="accountStore.userAccounts"
        @select="selectAndRedirect"
      />

      <ConnectAccountCreate
        v-else
        ref="account-create-form-ref"
      />
    </ConnectTransitionFade>

    <!-- Select Account Actions -->
    <div v-if="!addNew" class="flex justify-center">
      <UButton
        v-if="authUser.loginSource === ConnectLoginSource.BCSC"
        variant="outline"
        :label="$t('connect.label.createNewAccount')"
        icon="i-mdi-chevron-right"
        trailing
        size="xl"
        class="w-full justify-center sm:w-min sm:justify-normal"
        @click="toggleCreateNewAccount"
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
    <div v-if="addNew" class="flex justify-end gap-x-3">
      <UButton
        variant="outline"
        :label="$t('connect.label.back')"
        trailing
        size="xl"
        class="w-full justify-center sm:w-min sm:justify-normal"
        @click="toggleCreateNewAccount"
      />
      <UButton
        :label="$t('connect.label.saveAndContinue')"
        form="account-create-form"
        class="w-full justify-center sm:w-min sm:justify-normal"
        trailing
        type="submit"
        size="xl"
      />
    </div>
  </UContainer>
</template>
