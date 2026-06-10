export default defineNuxtPlugin({
  name: 'connect-account-bootstrap',
  order: -10,
  dependsOn: ['connect-auth', 'auth-api'],
  parallel: true,
  async setup(nuxtApp) {
    const { isAuthenticated, getToken } = useConnectAuth()
    const store = useConnectAccountStore()

    if (isAuthenticated.value) {
      // Initialize user accounts and user profile on app mount
      await Promise.all([
        store.initAccountStore(),
        store.syncUserProfile()
      ])

      // Force token refresh to return updated roles
      // Required only for new users
      if (store.userAccounts.length === 0) {
        await getToken(true)
      }
    }

    // sync user profile whenever the token is updated
    nuxtApp.hook('connect:auth:refresh', async () => {
      if (isAuthenticated.value) {
        await store.syncUserProfile()
      }
    })

    addRouteMiddleware('set-account-from-url-param', (to) => {
      if (to.query.accountid) {
        store.switchCurrentAccount(parseInt(to.query.accountid as string))
      }
    },
    { global: true }
    )
  }
})
