export const useConnectTosModals = () => {
  const { baseModal } = useConnectModal()
  const { logout } = useConnectAuth()
  const t = useNuxtApp().$i18n.t

  function openDeclineTosModal() {
    baseModal.open({
      title: `${t('connect.label.declineTermsOfUse')}?`,
      description: t('connect.text.declineTOSCantAccessService'),
      dismissible: true,
      buttons: [
        {
          label: t('connect.label.declineTermsOfUse'),
          onClick: async () => await logout()
        },
        {
          label: t('connect.label.cancel'),
          shouldClose: true,
          variant: 'outline'
        }
      ]
    })
  }

  // TODO: better error text
  function openPatchTosErrorModal() {
    baseModal.open({
      title: "Can't update TOS at this time",
      description: 'Please try again later',
      dismissible: true,
      buttons: [
        {
          label: t('connect.label.close'),
          shouldClose: true
        }
      ]
      // contact info ???
      // include api error message?
    })
  }

  function openCreateAccountModal() {
    baseModal.open({
      title: 'Account Creation Error',
      description: 'Please try again later',
      dismissible: true,
      buttons: [
        {
          label: t('connect.label.close'),
          shouldClose: true
        }
      ]
    })
  }

  function openUpdateUserContactModal() {
    baseModal.open({
      title: 'User Contact Update Error',
      description: 'Please try again later',
      dismissible: true,
      buttons: [
        {
          label: t('connect.label.close'),
          shouldClose: true
        }
      ]
    })
  }

  return {
    openCreateAccountModal,
    openDeclineTosModal,
    openPatchTosErrorModal,
    openUpdateUserContactModal
  }
}
