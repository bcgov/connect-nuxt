import { ConnectModal } from '#components'

export const useConnectModal = () => {
  const overlay = useOverlay()

  const baseModal = overlay.create(ConnectModal)

  // function openBaseModal(title: string, description: string, dismissible: boolean, buttons: ConnectModalButton[]) {
  //   const modal = overlay.create(ConnectModal, {
  //     props: {
  //       title,
  //       description,
  //       dismissible,
  //       buttons
  //     }
  //   })

  //   modal.open()
  // }

  return {
    baseModal
  }
}
