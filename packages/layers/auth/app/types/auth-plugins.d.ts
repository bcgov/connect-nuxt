import type { $Fetch } from 'ofetch'
import type Keycloak from 'keycloak-js'

declare module '#app' {
  interface NuxtApp {
    $authApi: $Fetch
    $connectAuth: Keycloak
  }
}

export {}
