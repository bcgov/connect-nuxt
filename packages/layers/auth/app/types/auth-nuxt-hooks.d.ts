import type { HookResult } from '@nuxt/schema'

declare module '#app' {
  interface RuntimeNuxtHooks {
    'connect:auth:refresh': (payload: { token: string | undefined }) => HookResult
  }
}
