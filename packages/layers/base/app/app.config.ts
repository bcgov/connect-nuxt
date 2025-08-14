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
    alert: {
      slots: {
        root: 'rounded'
      },
      compoundVariants: [
        {
          color: 'warning',
          variant: 'subtle',
          class: {
            root: 'text-highlighted bg-yellow-400/25 ring-2 ring-yellow-400',
            icon: 'text-warning',
            title: 'font-bold text-nuetral-highlighted',
            description: 'text-nuetral-highlighted'
          }
        }
      ]
    },
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
      },
      compoundVariants: [
        {
          color: 'primary',
          variant: 'solid',
          class: 'font-bold text-(--ui-bg) bg-(--ui-primary) hover:bg-(--ui-primary)/75 disabled:bg-(--ui-primary) aria-disabled:bg-(--ui-primary) focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-(--ui-primary)'
        },
        {
          color: 'primary',
          variant: 'ghost',
          class: 'text-(--ui-primary) hover:bg-(--ui-primary)/10 active:bg-(--ui-primary)/25 focus:outline-none focus-visible:bg-(--ui-primary)/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent'
        },
        {
          color: 'primary',
          variant: 'outline',
          class: 'ring ring-inset ring-primary text-primary hover:bg-primary/10 active:bg-primary/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary'
        }
      ],
      variants: {
        size: {
          sm: {
            base: 'px-7 py-0.5 text-sm gap-2.5',
            leadingIcon: 'size-4',
            leadingAvatarSize: '3xs',
            trailingIcon: 'size-4'
          },
          md: {
            base: 'px-7 py-1.5 text-sm gap-2.5',
            leadingIcon: 'size-5',
            leadingAvatarSize: '2xs',
            trailingIcon: 'size-5'
          },
          lg: {
            base: 'px-7 py-2.25 text-sm gap-2.5',
            leadingIcon: 'size-5',
            leadingAvatarSize: '2xs',
            trailingIcon: 'size-5'
          },
          xl: {
            base: 'px-7 py-2.5 text-base gap-2.5',
            leadingIcon: 'size-5',
            leadingAvatarSize: '2xs',
            trailingIcon: 'size-5'
          }
        }
      },
      defaultVariants: {
        color: 'primary',
        variant: 'solid',
        size: 'lg'
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
    formField: {
      slots: {
        root: '',
        wrapper: 'space-y-1',
        labelWrapper: 'flex content-center items-center justify-between',
        label: 'block font-bold text-base text-neutral-highlighted',
        container: 'mt-1 relative',
        description: 'text-(--ui-text) text-base text-neutral-toned mb-4 whitespace-normal',
        error: 'pl-4.5 mt-1 text-(--ui-error) text-xs',
        hint: 'text-(--ui-text)',
        help: 'pl-4.5 mt-1 text-(--ui-text) text-xs'
      },
      variants: {
        size: {
          xs: {
            root: 'text-xs'
          },
          sm: {
            root: 'text-xs'
          },
          md: {
            root: 'text-sm'
          },
          lg: {
            root: 'text-sm'
          },
          xl: {
            root: 'text-base'
          }
        },
        required: {
          true: {
            label: 'after:content-[\'*\'] after:ms-0.5 after:text-(--ui-error)'
          }
        }
      },
      defaultVariants: {
        size: 'md'
      }
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
          bcGov: 'ring-0 ring-transparent peer rounded-t-sm rounded-b-none bg-shade shadow-input focus:ring-0 focus:outline-none focus:shadow-input-focus text-neutral-highlighted aria-invalid:shadow-input-error aria-invalid:focus:shadow-input-error aria-invalid:ring-0'
        }
      },
      defaultVariants: {
        size: 'bcGovLg',
        color: 'primary',
        variant: 'bcGov'
      }
    },
    select: {
      slots: {
        content: 'rounded-sm',
        group: 'px-0 py-2',
        trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200 text-(--ui-text) group-data-[state=open]:text-primary group-focus:text-primary',
        item: 'my-0.75 text-neutral-highlighted before:rounded-none data-highlighted:not-data-disabled:text-primary data-highlighted:not-data-disabled:before:bg-shade data-[state=checked]:text-primary data-[state=checked]:bg-blue-50',
        itemLeadingIcon: 'group-data-[state=checked]:text-primary group-data-highlighted:not-data-disabled:text-primary text-neutral-highlighted'
      },
      variants: {
        size: {
          bcGov: {
            base: 'px-0 py-0 text-base gap-1.5',
            leading: 'ps-2.5',
            trailing: 'pe-2.5',
            leadingIcon: 'size-5',
            leadingAvatarSize: '2xs',
            trailingIcon: 'size-5',
            label: 'p-1.5 text-xs gap-1.5',
            item: 'py-3 px-4 text-sm gap-3',
            itemLeadingIcon: 'size-5',
            itemLeadingAvatarSize: '2xs',
            itemLeadingChip: 'size-5',
            itemLeadingChipSize: 'md',
            itemTrailingIcon: 'size-5'
          }
        },
        variant: {
          bcGov: 'peer rounded-t-sm rounded-b-none bg-shade focus:ring-0 focus:outline-none shadow-input data-[state=open]:shadow-input-focus focus:shadow-input-focus text-neutral-highlighted'
        }
      },
      defaultVariants: {
        size: 'bcGov',
        color: 'primary',
        variant: 'bcGov'
      }
    },
    textarea: {
      variants: {
        size: {
          bcGovLg: {
            base: 'px-2.5 pb-1.5 pt-5 text-base gap-1.5 resize-none',
            leading: 'ps-2.5',
            trailing: 'pe-2.5',
            leadingIcon: 'size-5',
            leadingAvatarSize: '2xs',
            trailingIcon: 'size-5'
          }
        },
        variant: {
          bcGov: 'peer rounded-t-sm rounded-b-none bg-shade focus:ring-0 focus:outline-none shadow-input focus:shadow-input-focus text-neutral-highlighted aria-invalid:shadow-input-error aria-invalid:focus:shadow-input-error aria-invalid:ring-0'
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
