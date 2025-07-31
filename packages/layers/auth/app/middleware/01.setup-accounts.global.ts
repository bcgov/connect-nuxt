import { useConnectAuth } from '#auth/app/composables/useConnectAuth'

export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.client) { // only run on client
    const { isAuthenticated } = useConnectAuth()
    if (isAuthenticated.value) {
      const accountStore = useConnectAccountStore()
      await accountStore.initAccountStore()

      if (to.query.accountid) {
        accountStore.switchCurrentAccount(parseInt(to.query.accountid as string))
      }
    }
  }
})
