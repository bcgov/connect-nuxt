export default defineNuxtPlugin((nuxtApp) => {
  const rtc = nuxtApp.$config.public
  const authApiUrl = rtc.authApiUrl + rtc.authApiVersion
  const appName = rtc.appName
  const xApiKey = rtc.xApiKey
  const { getToken } = useConnectAuth()

  const accountId = useConnectAccountStore().currentAccount.id

  const api = $fetch.create({
    baseURL: authApiUrl,
    async onRequest({ options }) {
      const token = await getToken()
      const headers = options.headers ||= {} as Headers
      if (Array.isArray(headers)) {
        headers.push(['Authorization', `Bearer ${token}`])
        headers.push(['App-Name', appName])
        headers.push(['Account-Id', accountId])
        headers.push(['X-Apikey', xApiKey])
      } else if (headers instanceof Headers) {
        headers.set('Authorization', `Bearer ${token}`)
        headers.set('App-Name', appName)
        headers.set('Account-Id', String(accountId))
        headers.set('X-Apikey', xApiKey)
      } else {
        // @ts-expect-error - 'Authorization' doesnt exist on type Headers
        headers.Authorization = `Bearer ${token}`
        // @ts-expect-error - 'App-Name' doesnt exist on type Headers
        headers['App-Name'] = appName
        // @ts-expect-error - 'Account-Id' doesnt exist on type Headers
        headers['Account-Id'] = accountId
        // @ts-expect-error - 'X-Apikey' doesnt exist on type Headers
        headers['X-Apikey'] = xApiKey
      }
    }
  })

  return {
    provide: {
      authApi: api
    }
  }
})
