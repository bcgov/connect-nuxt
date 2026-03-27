/* eslint-disable @typescript-eslint/ban-ts-comment */
export function setBreadcrumbs(breadcrumbs: ConnectBreadcrumb[]) {
  const route = useRoute()
  // @ts-ignore - Type instantiation is excessively deep and possibly infinite.
  // ignore instead of expect error due to local TS vs typecheck variance
  route.meta.breadcrumbs = breadcrumbs
}
