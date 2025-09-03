export interface ConnectContactItem {
  type: 'email' | 'phone' | 'fax'
  title: string
  value: string
  href?: string
}