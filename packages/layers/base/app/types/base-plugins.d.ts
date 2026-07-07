import type DOMPurify from 'dompurify'

declare module '#app' {
  interface NuxtApp {
    $sanitize: typeof DOMPurify.sanitize
  }
}

export {}
