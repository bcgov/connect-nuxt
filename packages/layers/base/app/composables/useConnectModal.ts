import { ConnectModal } from '#components'

export const useConnectModal = () => {
  const overlay = useOverlay()

  const baseModal = overlay.create(ConnectModal)

  return {
    baseModal
  }
}
