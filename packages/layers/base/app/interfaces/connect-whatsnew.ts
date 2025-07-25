export interface ConnectWhatsNewItem {
  app: string
  date: string
  description: string
  id: number
  priority: boolean
  read: boolean
  title: string
}

export interface ConnectWhatsNewState {
  viewed: boolean
  items: ConnectWhatsNewItem[]
}
