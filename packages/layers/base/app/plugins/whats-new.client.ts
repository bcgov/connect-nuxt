import { useStorage } from '@vueuse/core'

interface WhatsNewItem {
  app: string
  date: string
  description: string
  id:number
  priority: boolean
  read: boolean
  title: string
}

export default defineNuxtPlugin((nuxtApp) => {
  const rtc = useRuntimeConfig().public
  const url = rtc.statusApiUrl + rtc.statusApiVersion
  // load whats new only once
  nuxtApp.hook('app:mounted', async () => {
    const state = useStorage<{ viewed: boolean, items: WhatsNewItem[] }>(
      'connect-whats-new',
      { viewed: false, items: [] },
      localStorage,
      { mergeDefaults: true }
    )

    console.log('WHATS NEW: ', state.value)
    try {
      const res = await $fetch<WhatsNewItem[]>(`${url}/whatsnew`, { 
        parseResponse: JSON.parse,
        headers: {
          'App-Name': rtc.appName
        }
      })
      state.value.items = res
      console.log(res)
      console.log('WHATS NEW: ', state.value)
    } catch {}
  })
})