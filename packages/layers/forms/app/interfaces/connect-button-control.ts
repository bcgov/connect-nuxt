import type { ButtonProps } from '@nuxt/ui'

export interface ConnectButton extends ButtonProps {
  alertText?: string
  removeAlertSpacing?: boolean
}

export interface ConnectButtonGroup {
  alertText?: string
  buttons: ConnectButton[]
  stacked?: boolean
}

export interface ConnectButtonControl {
  leftGroup: ConnectButtonGroup
  rightGroup: ConnectButtonGroup
}
