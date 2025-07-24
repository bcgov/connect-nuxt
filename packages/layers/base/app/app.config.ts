export default defineAppConfig({
  connect: {
    header: {
      localeSelect: true,
      whatsNew: true
    },
    footer: {
      versions: []
    }
  },
  ui: {
    breadcrumb: {
      slots: {
        separatorIcon: 'text-secondary'
      },
      variants: {
        active: {
          true: {
            link: 'text-secondary font-medium'
          },
          false: {
            link: 'text-secondary underline font-medium'
          }
        }
      },
      compoundVariants: [
        {
          disabled: false,
          active: false,
          to: true,
          class: {
            link: 'hover:text-secondary hover:underline transition-colors'
          }
        }
      ]
    },
    button: {
      slots: {
        base: 'cursor-pointer'
      }
    },
    dropdownMenu: {
      slots: {
        content: 'bg-secondary ring-0',
        group: 'p-0'
      }
    },
    tooltip: {
      slots: {
        content: 'bg-neutral ring-neutral text-secondary p-4',
        arrow: 'fill-neutral'
      }
    }
  }
})

declare module '@nuxt/schema' {
  interface AppConfigInput {
    connect?: {
      header?: {
        localeSelect?: boolean
        whatsNew?: boolean
      }
      footer?: {
        versions?: string[]
      }
    }
  }
}
