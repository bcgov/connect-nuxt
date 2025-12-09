import { ConnectModal, ConnectModalError } from '#components'

export const useConnectModal = () => {
  const overlay = useOverlay()

  const baseModal = overlay.create(ConnectModal)
  const errorModal = overlay.create(ConnectModalError)

  return {
    baseModal,
    errorModal
  }
}
