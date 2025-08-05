declare module '#app' {
  interface PageMeta {
    onBeforeSessionExpired?: () => void | Promise<void>
    onAccountChange?: (newVal: ConnectAccount, oldVal: ConnectAccount) => boolean
  }
}

export {}
