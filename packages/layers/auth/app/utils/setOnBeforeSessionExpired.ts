// cant use await inside definePageMeta so must use separate util to set page meta if await required
/**
 * Sets the `onBeforeSessionExpired` callback for the current route.
 *
 * This function allows you to provide a callback (`cb`) that will be called before the session expires.
 * The callback can either be synchronous (returning `void`) or asynchronous (returning a `Promise`).
 *
 * @param {() => any | Promise<any>} cb - The callback function to execute before session expiry.
 *
 * @example
 * setOnBeforeSessionExpired(() => {
 *   // Do something before session expiry
 * });
 *
 * @example
 * setOnBeforeSessionExpired(() => submitApplication());
 */
export function setOnBeforeSessionExpired (cb: () => any | Promise<any>) {
  const route = useRoute()
  route.meta.onBeforeSessionExpired = async () => {
    await cb()
  }
}