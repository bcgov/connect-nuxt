<script setup lang="ts">
import loginImage from '#auth/public/img/BCReg_Generic_Login_image.jpg'

const { t } = useI18n()
const { login } = useConnectAuth()
const route = useRoute()
const ac = useAppConfig().connect.login

useHead({
  title: t('connect.page.login.title')
})

definePageMeta({
  layout: 'connect-auth',
  hideBreadcrumbs: true,
  middleware: 'connect-login-page'
})

const isSessionExpired = sessionStorage.getItem(ConnectAuthStorageKey.CONNECT_SESSION_EXPIRED)

/** Whether to show the BCSC new user alert */
const displayBcscAlert = computed<boolean>(() => {
  const queryPreset = route.query.preset as string | undefined
  return queryPreset === ConnectPresetType.BCSC_USER
})

const loginOptions = computed(() => {
  const loginOptionsMap: Record<
    ConnectValidIdpOption,
    { label: string, icon: string, onClick: () => Promise<void> }
  > = {
    bcsc: {
      label: t('connect.page.login.loginBCSC'),
      icon: 'i-mdi-account-card-details-outline',
      onClick: () => login(ConnectIdpHint.BCSC)
    },
    bceid: {
      label: t('connect.page.login.loginBCEID'),
      icon: 'i-mdi-two-factor-authentication',
      onClick: () => login(ConnectIdpHint.BCEID)
    },
    idir: {
      label: t('connect.page.login.loginIDIR'),
      icon: 'i-mdi-account-group-outline',
      onClick: () => login(ConnectIdpHint.IDIR)
    }
  }

  return ac.idps.map(key => loginOptionsMap[key as keyof typeof loginOptionsMap])
})
</script>

<template>
  <div class="flex grow flex-col items-center justify-center py-10">
    <div class="flex flex-col items-center gap-10">
      <UAlert
        v-if="displayBcscAlert"
        class="max-w-[35em]"
        color="warning"
        variant="subtle"
        data-testid="bcsc-user-welcome-alert"
        :title="$t('connect.page.login.newBcscUserWelcome.title')"
        :description="$t('connect.page.login.newBcscUserWelcome.description')"
        icon="i-mdi-check-circle"
        :ui="{
          icon: 'text-success',
        }"
      />
      <h1>
        {{ $t('connect.page.login.h1') }}
      </h1>
      <UAlert
        v-if="isSessionExpired"
        color="warning"
        variant="subtle"
        :title="$t('connect.page.login.sessionExpiredAlert.title')"
        :description="$t('connect.page.login.sessionExpiredAlert.description')"
        icon="i-mdi-alert"
      />
      <UCard
        class="my-auto max-w-md"
        data-testid="login-card"
      >
        <img
          :src="loginImage"
          class="pb-4"
          :alt="$t('connect.text.imageAltGenericLogin')"
        >
        <div class="space-y-4 pt-2.5">
          <div
            v-for="(option, i) in loginOptions"
            :key="option.label"
            class="flex flex-col items-center gap-1"
          >
            <UButton
              :variant="i === 0 ? 'solid' : 'outline'"
              block
              class="py-2.5"
              v-bind="option"
            />
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>
