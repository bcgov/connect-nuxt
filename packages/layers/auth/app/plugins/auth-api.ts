export default defineNuxtPlugin(() => {
  const rtc = useRuntimeConfig().public
  const authApiUrl = rtc.authApiUrl + rtc.authApiVersion
  const appName = rtc.appName
  const xApiKey = rtc.xApiKey
  
  const api = $fetch.create({
    baseURL: authApiUrl,
    async onRequest({ options }) {
      const { getToken } = useConnectAuth()
      const accountStore = useConnectAccountStore()

      const token = await getToken()
      const accountId = accountStore.currentAccount.id

      options.headers.set('Authorization', `Bearer ${token}`)
      options.headers.set('App-Name', appName)
      options.headers.set('X-Apikey', xApiKey)
      options.headers.set('Account-Id', String(accountId))
    }
  })

  return {
    provide: {
      authApi: api
    }
  }
})