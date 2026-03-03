export default defineNuxtPlugin((nuxtApp) => {
  const rtc = nuxtApp.$config.public
  const payApiUrl = `${rtc.payApiUrl}${rtc.payApiVersion}`
  const appName = String(rtc.appName ?? '')
  const xApiKey = String(rtc.xApiKey ?? '')

  const api = $fetch.create({
    baseURL: payApiUrl as string,
    async onRequest({ options }) {
      const auth = useConnectAuth()
      const accountStore = useConnectAccountStore()

      const token = await auth.getToken()
      const accountId = accountStore.currentAccount.id

      options.headers.set('Authorization', `Bearer ${token}`)
      options.headers.set('App-Name', appName)
      options.headers.set('X-Apikey', xApiKey)
      options.headers.set('Account-Id', String(accountId))
    }
  })

  return {
    provide: {
      payApi: api
    }
  }
})
