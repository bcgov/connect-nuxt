export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useConnectAuth()
  const rtc = useRuntimeConfig().public
  const localePath = useLocalePath()

  if (!isAuthenticated.value) {
    return navigateTo(localePath(`/auth/login?return=${rtc.baseUrl}${to.fullPath.slice(1)}`))
  }
})
