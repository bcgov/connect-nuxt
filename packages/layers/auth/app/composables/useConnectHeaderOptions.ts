import { useConnectAuth } from '#imports'
import type { DropdownMenuItem } from '@nuxt/ui'
import { useStorage } from '@vueuse/core'
import { ConnectSlideoverWhatsNew } from '#components'

// handle navigation items and functionality
export function useConnectHeaderOptions() {
  const rtc = useRuntimeConfig().public
  const authWebUrl = rtc.authWebUrl
  const appBaseUrl = rtc.baseUrl
  const ac = useAppConfig().connect
  const route = useRoute()
  const overlay = useOverlay()
  const { t, locale: { value: locale } } = useNuxtApp().$i18n
  const { login, logout, isAuthenticated, authUser } = useConnectAuth()
  const accountStore = useConnectAccountStore()

  const whatsNew = useStorage<ConnectWhatsNewState>('connect-whats-new', { viewed: false, items: [] })
  const slideover = overlay.create(ConnectSlideoverWhatsNew)

  /** return the correct account creation link based on auth state */
  function createAccountUrl(): string {
    if (isAuthenticated.value) {
      return authWebUrl + 'setup-account'
    } else {
      return authWebUrl + 'choose-authentication-method'
    }
  }

  const basicAccountOptions = computed<DropdownMenuItem[]>(() => {
    const options: DropdownMenuItem[] = [{ slot: 'account', type: 'label' }]
    if ([ConnectLoginSource.BCEID, ConnectLoginSource.BCSC].includes(authUser?.value.loginSource)) {
      options.push({
        label: t('connect.label.editProfile'),
        icon: 'i-mdi-account-outline',
        to: authWebUrl + 'userprofile'
      })
    }
    options.push({
      label: t('connect.label.logout'),
      icon: 'i-mdi-logout-variant',
      onSelect: () => logout()
    })
    return options
  })

  const accountSettingsOptions = computed<DropdownMenuItem[]>(() => {
    const accountId = accountStore.currentAccount.id
    const options: DropdownMenuItem[] = [
      {
        label: t('connect.label.accountSettings'),
        type: 'label'
      },
      {
        label: t('connect.label.accountInfo'),
        icon: 'i-mdi-information-outline',
        to: authWebUrl + `account/${accountId}/settings/account-info`
      },
      {
        label: t('connect.label.teamMembers'),
        icon: 'i-mdi-account-group-outline',
        to: authWebUrl + `account/${accountId}/settings/team-members`
      }
    ]
    // TODO: remove staff checks?
    if (
      [AccountType.PREMIUM, AccountType.SBC_STAFF, AccountType.STAFF].includes(accountStore.currentAccount.accountType)
    ) {
      options.push({
        label: t('connect.label.transactions'),
        icon: 'i-mdi-file-document-outline',
        to: authWebUrl + `account/${accountId}/settings/transactions`
      })
    }
    return options
  })

  const switchAccountOptions = computed<DropdownMenuItem[]>(() => {
    const options: DropdownMenuItem[] = []

    if (accountStore.userAccounts.length > 1) {
      options.push({ label: t('connect.label.switchAccount'), type: 'label' })

      accountStore.userAccounts.forEach((account) => {
        const isActive = accountStore.currentAccount.id === account.id
        options.push({
          label: account.label,
          onSelect: () => {
            if (!isActive && account.id) {
              if (route.meta.onAccountChange) {
                // TODO: add route meta option
                const allowAccountChange = true
                // const allowAccountChange = route.meta.onAccountChange(accountStore.currentAccount, account)
                if (allowAccountChange) {
                  accountStore.switchCurrentAccount(account.id)
                }
              } else {
                accountStore.switchCurrentAccount(account.id)
              }
            }
          },
          slot: 'account-item',
          icon: isActive ? 'i-mdi-check' : '',
          class: isActive ? 'bg-shade text-primary' : '',
          ui: {
            itemLabel: isActive ? '' : 'pl-6',
            itemLeadingIcon: isActive ? 'size-5 text-primary shrink-0' : ''
          }
        })
      })
    }

    return options
  })

  const createAccountOptions = computed<DropdownMenuItem[]>(() => {
    if ([ConnectLoginSource.BCROS, ConnectLoginSource.IDIR].includes(authUser?.value.loginSource)) {
      return []
    }
    return [{ label: t('connect.label.createAccount'), icon: 'i-mdi-plus', to: createAccountUrl() }]
  })

  const loggedInUserOptions = computed<DropdownMenuItem[][]>(() => {
    const options = [
      basicAccountOptions.value,
      accountSettingsOptions.value
    ]

    if (switchAccountOptions.value.length > 0) {
      options.push(switchAccountOptions.value)
    }

    if (createAccountOptions.value.length > 0) {
      options.push(createAccountOptions.value)
    }

    return options
  })

  const loginRedirectUrl = ac.login.redirectPath
    ? appBaseUrl + locale + ac.login.redirectPath
    : undefined

  const loginOptionsMap: Record<'bcsc' | 'bceid' | 'idir',
    { label: string, icon: string, onSelect: () => Promise<void> }
  > = {
    bcsc: {
      label: t('connect.label.bcsc'),
      icon: 'i-mdi-account-card-details-outline',
      onSelect: () => login(ConnectIdpHint.BCSC, loginRedirectUrl)
    },
    bceid: {
      label: t('connect.label.bceid'),
      icon: 'i-mdi-two-factor-authentication',
      onSelect: () => login(ConnectIdpHint.BCEID, loginRedirectUrl)
    },
    idir: {
      label: t('connect.label.idir'),
      icon: 'i-mdi-account-group-outline',
      onSelect: () => login(ConnectIdpHint.IDIR, loginRedirectUrl)
    }
  }

  const loggedOutUserOptions = computed<DropdownMenuItem[][]>(() => {
    const options: DropdownMenuItem[][] = [[{ label: t('connect.label.selectLoginMethod'), type: 'label' }]]

    const idps = ac.login.idps.map(key => loginOptionsMap[key as keyof typeof loginOptionsMap])

    options.push(idps)

    return options
  })

  const loggedOutUserOptionsMobile = computed<DropdownMenuItem[][]>(() => {
    const config = ac.header
    const options: DropdownMenuItem[][] = []

    if (config.loginMenu) {
      options.push(...loggedOutUserOptions.value)
    }
    if (config.whatsNew) {
      options.push([
        {
          'label': t('connect.label.whatsNew'),
          'aria-label': t('connect.label.whatsNewAria', {
            count: whatsNew.value.viewed ? 0 : whatsNew.value.items.length }
          ),
          'slot': 'whatsnew' as const,
          'icon': 'i-mdi-new-box',
          'onSelect': () => {
            slideover.open({
              items: whatsNew.value.items
            })
            whatsNew.value.viewed = true
          }
        }
      ])
    }
    if (config.createAccount) {
      options.push([{ label: t('connect.label.createAccount'), icon: 'i-mdi-plus', to: createAccountUrl() }])
    }

    return options
  })

  const notificationsOptions = computed<DropdownMenuItem[][]>(() => {
    const count = accountStore.pendingApprovalCount
    const options = []
    if (count > 0) {
      options.push([{
        to: authWebUrl + `account/${accountStore.currentAccount.id}/settings/team-members`,
        label: t('connect.text.notifications.teamMemberApproval', {
          count: accountStore.pendingApprovalCount
        }, accountStore.pendingApprovalCount
        )
      }])
    } else {
      options.push([{ label: t('connect.text.notifications.none') }])
    }
    return options
  })

  return {
    basicAccountOptions,
    accountSettingsOptions,
    switchAccountOptions,
    createAccountOptions,
    loggedInUserOptions,
    loggedOutUserOptions,
    loggedOutUserOptionsMobile,
    notificationsOptions,
    createAccountUrl
  }
}
