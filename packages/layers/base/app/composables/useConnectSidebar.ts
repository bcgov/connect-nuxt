import type { NavigationMenuItem } from '@nuxt/ui'

export const useConnectSidebar = (
  stateKey: string = 'default-sidebar'
) => {
  const sidebarItems = useState<NavigationMenuItem[]>(stateKey, () => [])

  return {
    sidebarItems
  }
}
