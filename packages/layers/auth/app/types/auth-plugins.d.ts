import type { $Fetch } from 'ofetch'
import type Keycloak from 'keycloak'

declare module '#app' {
  interface NuxtApp {
    $authApi: $Fetch
    $connectAuth: Keycloak
  }
}

export {}
