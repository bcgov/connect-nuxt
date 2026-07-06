import type { $Fetch } from 'ofetch'

declare module '#app' {
  interface NuxtApp {
    $payApi: $Fetch
  }
}

export {}
