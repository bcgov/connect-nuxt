export default defineAppConfig({
  connect: {
    header: {
      localeSelect: true
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
    myLayer?: {
      /** Project name */
      name?: string
    }
    connect?: {
      header?: {
        localeSelect?: boolean
      }
      footer?: {
        versions?: string[]
      }
    }
  }
}
