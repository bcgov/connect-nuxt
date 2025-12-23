export const useConnectAuthModals = () => {
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
      title: `${t('connect.text.patchTosError.title')}`,
      description: t('connect.text.patchTosError.description'),
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
      title: `${t('connect.text.accountCreationError.title')}`,
      description: t('connect.text.accountCreationError.description'),
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
      title: `${t('connect.text.userContactUpdateError.title')}`,
      description: t('connect.text.userContactUpdateError.description'),
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
