import type { ButtonProps, IconProps, BadgeProps, LinkProps } from '@nuxt/ui'
import type { VNode } from 'vue'

export interface ConnectTombstoneSideDetail {
  label: string
  value: string
  edit?: {
    isEditing: boolean
    validation?: {
      error: string
      validate: (val: string) => string
    }
    action: (...args: unknown[]) => unknown | Promise<unknown>
  }
}

export interface ConnectTombstoneTitle {
  text: string
  el: string
}

export interface ConnectTombstoneLink extends LinkProps {
  label?: string
}

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
