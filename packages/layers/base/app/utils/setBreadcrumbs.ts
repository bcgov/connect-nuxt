export function setBreadcrumbs(breadcrumbs: ConnectBreadcrumb[]) {
  const route = useRoute()
  // @ts-expect-error - Type instantiation is excessively deep and possibly infinite.
  route.meta.breadcrumbs = breadcrumbs
}
