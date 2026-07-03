declare module '#app' {
  interface PageMeta {
    onBeforeSessionExpired?: () => void | Promise<void>
    onAccountChange?: (oldAccount: ConnectAccount, newAccount: ConnectAccount) => boolean
  }
}

export {}
