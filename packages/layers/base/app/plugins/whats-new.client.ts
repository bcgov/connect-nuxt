import { useStorage } from '@vueuse/core'
import isEqual from 'lodash-es/isEqual'

export default defineNuxtPlugin((nuxtApp) => {
  // exit early if whats new === false
  const whatsNew = useAppConfig().connect.header.whatsNew
  if (!whatsNew) {
    return
  }
  const rtc = useRuntimeConfig().public
  const url = rtc.statusApiUrl + rtc.statusApiVersion
  
  // load whats new only once when app mounts
  nuxtApp.hook('app:mounted', async () => {
    // set default localStorage state
    const state = useStorage<ConnectWhatsNewState>(
      'connect-whats-new', // storage key
      { viewed: false, items: [] }, // default value
      localStorage, // could change this to sessionStorage
      { mergeDefaults: true } // merge anything already in localStorage with default value
    )

    try {
      // fetch items
      const res = await $fetch<ConnectWhatsNewItem[]>(`${url}/whatsnew`, { 
        parseResponse: JSON.parse, // required to parse JSON correctly
        headers: {
          'App-Name': rtc.appName
        }
      })

      // only update value if new items exist
      if (!isEqual(state.value.items, res) && res.length > 0) {
        state.value.items = res 
        state.value.viewed = false
      }  
    } catch {
      // silently handle errors
    }
  })
})