export default defineNuxtPlugin({
  name: 'connect-account-bootstrap',
  order: -10,
  dependsOn: ['connect-auth', 'auth-api'],
  async setup(nuxtApp) {
    const { isAuthenticated } = useConnectAuth()
    const store = useConnectAccountStore()

    if (isAuthenticated.value) {
      // initialize user accounts and user profile on app mount
      await Promise.all([
        store.initAccountStore(),
        store.syncUserProfile()
      ])
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
