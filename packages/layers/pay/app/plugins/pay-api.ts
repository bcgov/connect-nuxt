export default defineNuxtPlugin((nuxtApp) => {
  const rtc = nuxtApp.$config.public
  const payApiUrl = rtc.payApiUrl + rtc.payApiVersion
  const appName = rtc.appName
  const xApiKey = rtc.xApiKey

  const api = $fetch.create({
    baseURL: payApiUrl,
    async onRequest({ options }) {
      const auth = useConnectAuth()
      const accountStore = useConnectAccountStore()

      const token = await auth.getToken()
      const accountId = accountStore.currentAccount.id

      options.headers.set('Authorization', `Bearer ${token}`)
      options.headers.set('App-Name', appName)
      options.headers.set('X-Apikey', xApiKey)
      options.headers.set('Account-Id', String(accountId))
    },
    async onResponseError({ response }) {
      const localePath = useLocalePath()
      const errorRedirects = useAppConfig().connect.payApi.errorRedirect || {}
      if (response.status === 401 && errorRedirects?.[response.status]) {
        await nuxtApp.runWithContext(() => navigateTo(localePath(errorRedirects[401])))
      }
    }
  })

  return {
    provide: {
      payApi: api
    }
  }
})
