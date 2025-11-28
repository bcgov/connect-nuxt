<script setup lang="ts">
definePageMeta({
  layout: 'connect-auth',
  alias: ['/auth/account/create'],
  middleware: 'connect-auth'
})

const rtc = useRuntimeConfig().public
const accountStore = useConnectAccountStore()
const { authUser } = useConnectAuth()

const addNew = ref(false)

onBeforeMount(() => {
  if (accountStore.userAccounts.length === 0) {
    addNew.value = true
  }
})
</script>

<template>
  <UContainer class="max-w-6xl">
    <ConnectTransitionFade>
      <div class="space-y-6 sm:space-y-10">
        <h1>{{ !addNew ? $t('connect.label.existingAccountFound') : 'Service BC Account Creation' }}</h1>
        <ConnectAccountExistingAlert v-if="!addNew" />
      </div>
    </ConnectTransitionFade>

    <ConnectTransitionFade>
      <ConnectAccountExistingList
        v-if="addNew === false"
        :accounts="accountStore.userAccounts"
        @select="(e) => accountStore.switchCurrentAccount(e)"
      />

      <div v-else class="h-[66dvh] bg-white rounded border-2 border-black flex items-center justify-center text-3xl">
        Create Account Form Here
      </div>
    </ConnectTransitionFade>

    <div class="flex justify-center">
      <UButton
        v-if="authUser.loginSource === ConnectLoginSource.BCSC"
        variant="outline"
        :label="$t('connect.label.createNewAccount')"
        icon="i-mdi-chevron-right"
        trailing
        size="xl"
        class="w-full justify-center sm:w-min sm:justify-normal"
        @click="addNew = !addNew"
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
  </UContainer>
</template>
