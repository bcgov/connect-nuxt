// Patch JSDOM EventTarget.addEventListener to accept Node.js AbortSignal.
// Using domEnvironment: 'jsdom' - Libraries use Node's global AbortController
// but JSDOM's addEventListener requires JSDOM's own AbortSignal.
if (typeof window !== 'undefined' && window.EventTarget) {
  const originalAddEventListener = window.EventTarget.prototype.addEventListener

  window.EventTarget.prototype.addEventListener = function addEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject | null,
    options?: boolean | AddEventListenerOptions
  ) {
    if (typeof options === 'object' && options?.signal != null) {
      const { signal, ...otherOptions } = options
      if (signal.aborted) {
        return
      }

      signal.addEventListener('abort', () => {
        this.removeEventListener(type, callback, otherOptions)
      }, { once: true })

      return originalAddEventListener.call(this, type, callback, otherOptions)
    }
    return originalAddEventListener.call(this, type, callback, options)
  }
}
