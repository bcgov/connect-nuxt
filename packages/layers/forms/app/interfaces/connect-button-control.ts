import type { ButtonProps } from '@nuxt/ui'

export interface ConnectButton extends ButtonProps {
  alertText?: string
  removeAlertSpacing?: boolean
}

export interface ConnectButtonControl {
  leftButtons: ConnectButton[]
  rightButtons: ConnectButton[]
  leftAlertText?: string
  rightAlertText?: string
}
