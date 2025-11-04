declare module 'vue' {
  interface GlobalDirectives {
    vSanitize: Directive<HTMLElement, string>
  }
}

export {}
