<script setup lang="ts">
const route = useRoute()
const rtc = useRuntimeConfig().public
const ac = useAppConfig().connect
const { locale } = useI18n()
const { logout } = useConnectAuth()

const redirectUrl = computed(() => {
  const urlReturn = route.query.return
  const url = urlReturn !== undefined
    ? urlReturn as string
    : `${rtc.baseUrl}${locale.value}${ac.login.redirect}`
  return url
}) 

onMounted(async () => {
  await logout(redirectUrl.value)
})
</script>
<template>
  <ConnectSpinner fullscreen />
</template>