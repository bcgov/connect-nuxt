export function setBreadcrumbs(breadcrumbs: ConnectBreadcrumb[]) {
  const route = useRoute()
  // @ts-ignore
  route.meta.breadcrumbs = breadcrumbs
}
