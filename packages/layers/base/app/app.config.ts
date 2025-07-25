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
    card: {
      slots: {
        root: 'rounded-md'
      }
    },
    dropdownMenu: {
      slots: {
        content: 'bg-secondary ring-0',
        group: 'p-0'
      }
    },
    input: {
      variants: {
        size: {
          bcGovLg: {
            base: 'px-2.5 pb-2 pt-6 text-base gap-1.5',
            leading: 'ps-2.5',
            trailing: 'pe-2.5',
            leadingIcon: 'size-5',
            leadingAvatarSize: '2xs',
            trailingIcon: 'size-5'
          }
        },
        variant: {
          bcGov: 'ring-0 ring-transparent peer rounded-t-sm rounded-b-none bg-shadePrimary shadow-input focus:ring-0 focus:outline-none focus:shadow-inputFocus text-neutralDark'
        }
      },
      defaultVariants: {
        size: 'bcGovLg',
        color: 'primary',
        variant: 'bcGov'
      }
    },
    textarea: {
      variants: {
        size: {
          bcGovLg: {
            base: 'px-2.5 pb-1.5 pt-5 text-base gap-1.5',
            leading: 'ps-2.5',
            trailing: 'pe-2.5',
            leadingIcon: 'size-5',
            leadingAvatarSize: '2xs',
            trailingIcon: 'size-5'
          }
        },
        variant: {
          bcGov: 'peer rounded-t-sm rounded-b-none bg-shadePrimary focus:ring-0 focus:outline-none shadow-input focus:shadow-inputFocus text-neutralDark'
        }
      },
      defaultVariants: {
        size: 'bcGovLg',
        color: 'primary',
        variant: 'bcGov'
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
