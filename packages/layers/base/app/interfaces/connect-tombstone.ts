import type { ButtonProps, IconProps, BadgeProps, LinkProps } from '@nuxt/ui'
import type { VNode } from 'vue'

export interface ConnectTombstoneSideDetail {
  label: string
  value: string
}

export interface ConnectTombstoneTitle {
  text: string
  as: 'span' | 'p' | 'div' | 'h1' | 'h2' | 'h3' | 'h4'
}

// must also update ConnectTombstoneItem props if updating this type
export interface ConnectTombstoneLink extends LinkProps {
  label?: string
}

// must also update ConnectTombstoneItem props if updating this type
export interface ConnectTombstoneItem {
  text?: string
  itemClass?: string
  icon?: IconProps
  badge?: BadgeProps
  link?: ConnectTombstoneLink
  vNode?: VNode
}

export type ConnectTombstoneBtn = {
  button?: ButtonProps
  vNode?: VNode
}

export interface ConnectTombstoneState {
  loading: boolean
  title: ConnectTombstoneTitle
  subtitles: ConnectTombstoneItem[]
  details: ConnectTombstoneItem[]
  sideDetails: ConnectTombstoneSideDetail[]
  bottomButtons: ConnectTombstoneBtn[]
}
