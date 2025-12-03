export const useConnectTosModals = () => {
  const { baseModal } = useConnectModal()
  const { logout } = useConnectAuth()
  const t = useNuxtApp().$i18n.t

  function openDeclineTOSModal() {
    baseModal.open({
      title: `${t('connect.label.declineTermsOfUse')}?`,
      description: t('connect.text.declineTOSCantAccessService'),
      dismissible: true,
      buttons: [
        {
          label: t('connect.label.declineTermsOfUse'),
          onClick: async () => await logout() // TODO: - QUESTION - configure redirect target on logout?
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

  return {
    openDeclineTOSModal,
    openPatchTosErrorModal
  }
}
