<script setup lang="ts">
const isSmallScreen = useMediaQuery('(max-width: 640px)')
const rtc = useRuntimeConfig().public
const modalTimeout = rtc.sessionModalTimeout ? Number(rtc.sessionModalTimeout) : 120000
const { t } = useI18n()
const route = useRoute()
const localePath = useLocalePath()

const emit = defineEmits<{ close: [] }>()

const timeRemaining = ref(toValue((modalTimeout) / 1000))

// Capture the user's current location when the modal opens, before any potential URL changes
const capturedUrl = `${window.location.origin}${route.fullPath}`

/** Build a login page URL with a return param preserving the user's current location.
 *  The return value is double-encoded so it survives the Keycloak redirect decode
 *  without the original query params bleeding into the login page's query string.
 */
function getSessionExpiredRedirect(): string {
  const loginPath = localePath('/auth/login')
  const returnUrl = encodeURIComponent(encodeURIComponent(capturedUrl))
  return `${window.location.origin}${loginPath}?return=${returnUrl}`
}

const intervalId = setInterval(async () => {
  const value = timeRemaining.value - 1
  timeRemaining.value = value < 0 ? 0 : value

  if (value === 0) {
    if (route.meta.onBeforeSessionExpired) {
      await route.meta.onBeforeSessionExpired()
    }
    sessionStorage.setItem(ConnectAuthStorageKey.CONNECT_SESSION_EXPIRED, 'true')
    await useConnectAuth().logout(getSessionExpiredRedirect())
  }
}, 1000)

const ariaCountdownText = computed(() => {
  if (timeRemaining.value === 30) { // trigger aria alert when 30 seconds remain
    return t('connect.sessionExpiry.content', { count: timeRemaining.value })
  } else if (timeRemaining.value === 2) { // trigger aria alert when session expires
    return t('connect.sessionExpiry.sessionExpired')
  } else {
    return ''
  }
})

function closeModal() {
  clearInterval(intervalId)
  emit('close')
}

onMounted(() => {
  // allow any keypress to close the modal
  window.addEventListener('keydown', closeModal)
})

onUnmounted(() => {
  // cleanup
  window.removeEventListener('keydown', closeModal)
})
</script>

<template>
  <UModal
    id="session-expired-dialog"
    overlay
    :title="$t('connect.sessionExpiry.title')"
    :description="$t('connect.sessionExpiry.content', { count: timeRemaining })"
    @after:leave="closeModal"
  >
    <template #content>
      <div class="p-10 flex flex-col gap-6">
        <div role="alert">
          <h2
            id="session-expired-dialog-title"
            class="text-xl font-bold text-neutral-highlighted"
          >
            {{ $t('connect.sessionExpiry.title') }}
          </h2>
        </div>
        <div>
          <ConnectI18nHelper
            id="session-expired-dialog-description"
            translation-path="connect.sessionExpiry.content"
            :count="timeRemaining"
          />

          <div role="alert">
            <span class="sr-only">{{ ariaCountdownText }}</span>
          </div>
        </div>
        <div class="flex flex-wrap items-center justify-center gap-4">
          <UButton
            :block="isSmallScreen"
            :label="$t('connect.sessionExpiry.continueBtn.main')"
            :aria-label="$t('connect.sessionExpiry.continueBtn.aria')"
            size="xl"
            class="font-bold"
            @click="closeModal"
          />
        </div>
      </div>
    </template>
  </UModal>
</template>
