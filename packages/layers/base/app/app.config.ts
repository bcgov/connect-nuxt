/* eslint-disable max-len */
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
        content: 'min-w-32 max-h-[75dvh] shadow-lg rounded-sm',
        group: 'p-0 isolate',
        item: 'group relative w-full flex items-center select-none outline-none before:inset-px before:rounded-none cursor-pointer',
        separator: '-mx-0 my-0 h-px bg-(--ui-border)'
      },
      variants: {
        active: {
          true: {
            item: 'text-primary before:bg-shade',
            itemLeadingIcon: 'text-(--ui-text)'
          },
          false: {
            item: 'text-(--ui-text) data-highlighted:text-primary data-[state=open]:text-(--ui-text-highlighted) data-highlighted:before:bg-shade data-[state=open]:before:bg-(--ui-bg-elevated)/50 transition-colors before:transition-colors',
            itemLeadingIcon: 'text-neutral group-data-highlighted:text-primary group-data-[state=open]:text-(--ui-text) transition-colors'
          }
        },
        size: {
          md: {
            label: 'px-4 py-3 text-sm gap-1.5',
            item: 'px-4 py-3 text-sm gap-1.5',
            itemLeadingIcon: 'size-5',
            itemLeadingAvatarSize: '2xs',
            itemTrailingIcon: 'size-5',
            itemTrailingKbds: 'gap-0.5',
            itemTrailingKbdsSize: 'md'
          }
        }
      },
      compoundVariants: [
        {
          color: 'primary',
          active: false,
          class: {
            item: 'text-(--ui-primary) data-highlighted:text-(--ui-primary) data-highlighted:before:bg-(--ui-primary)/10 data-[state=open]:before:bg-(--ui-primary)/10',
            itemLeadingIcon: 'text-(--ui-primary) group-data-highlighted:text-(--ui-primary) group-data-[state=open]:text-(--ui-primary)'
          }
        },
        {
          color: 'primary',
          active: true,
          class: {
            item: 'text-(--ui-primary) before:bg-(--ui-primary)/10',
            itemLeadingIcon: 'text-(--ui-primary)'
          }
        }
      ]
    },
    icons: {
      arrowLeft: 'i-mdi-arrow-left',
      arrowRight: 'i-mdi-arrow-right',
      check: 'i-mdi-check',
      chevronDoubleLeft: 'i-mdi-chevron-double-left',
      chevronDoubleRight: 'i-mdi-chevron-double-right',
      chevronDown: 'i-mdi-menu-down',
      chevronLeft: 'i-mdi-menu-left',
      chevronRight: 'i-mdi-menu-right',
      chevronUp: 'i-mdi-menu-up',
      close: 'i-mdi-close',
      ellipsis: 'i-mdi-dots-horizontal',
      external: 'i-mdi-open-in-new',
      file: 'i-mdi-file',
      folder: 'i-mdi-folder',
      folderOpen: 'i-mdi-folder-open',
      loading: 'i-mdi-loading',
      minus: 'i-mdi-minus',
      plus: 'i-mdi-plus',
      search: 'i-mdi-magnify',
      upload: 'i-mdi-upload'
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
          bcGov: 'ring-0 ring-transparent peer rounded-t-sm rounded-b-none bg-shade shadow-input focus:ring-0 focus:outline-none focus:shadow-input-focus text-neutral-highlighted'
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
          bcGov: 'peer rounded-t-sm rounded-b-none bg-shade focus:ring-0 focus:outline-none shadow-input focus:shadow-input-focus text-neutral-highlighted'
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
