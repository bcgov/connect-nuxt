export const useButtonControl = () => {
  const route = useRoute()

  function setButtonControl(buttonControl: ConnectButtonControl) {
    // @ts-expect-error; typescript complains about the object type being too large
    route.meta.buttonControl = buttonControl
  }

  function getButtonControl(): ConnectButtonControl {
    return route.meta.buttonControl as ConnectButtonControl
  }

  function handleButtonLoading(reset: boolean, buttonGrp?: 'left' | 'right', buttonIndex?: number) {
    // set button control for loading / disabling buttons on submit or save or reset to default
    const updateButtonGrp = (buttonArray: ConnectButton[], grp: 'left' | 'right') => {
      for (const [index, element] of buttonArray.entries()) {
        if (reset) {
          element.disabled = false
          element.loading = false
        } else {
          element.loading = (grp === buttonGrp) && index === buttonIndex
          element.disabled = !element.loading
        }
      }
    }
    const buttonControl = getButtonControl()
    // update left buttons with loading / disabled as required
    updateButtonGrp(buttonControl.leftGroup.buttons, 'left')
    // update right buttons with loading / disabled as required
    updateButtonGrp(buttonControl.rightGroup.buttons, 'right')
  }

  async function setAlertText(reset: boolean, grp?: 'left' | 'right', index?: number, text?: string) {
    const resetButtonGrp = (buttonArray: ConnectButton[]) => {
      for (const element of buttonArray) {
        element.alertText = undefined
      }
    }
    // clear existing text
    if (route.meta.buttonControl) {
      route.meta.buttonControl.leftGroup.alertText = undefined
      route.meta.buttonControl.rightGroup.alertText = undefined
      resetButtonGrp(route.meta.buttonControl.leftGroup.buttons)
      resetButtonGrp(route.meta.buttonControl.rightGroup.buttons)
    }

    // only continue if not resetting
    if (!reset) {
      // required for dom to clear existing content
      // allows screenreader alert for the same content if set multiple times
      await nextTick()
      // set content
      if (route.meta.buttonControl) {
        if (index === undefined) {
          route.meta.buttonControl.leftGroup.alertText = (grp === 'left') ? text : undefined
          route.meta.buttonControl.rightGroup.alertText = (grp === 'right') ? text : undefined
        } else if (grp === 'left' && route.meta.buttonControl.leftGroup.buttons[index]) {
          route.meta.buttonControl.leftGroup.buttons[index].alertText = text
        } else if (grp === 'right' && route.meta.buttonControl.rightGroup.buttons[index]) {
          route.meta.buttonControl.rightGroup.buttons[index].alertText = text
        }
      }
    }
  }

  return {
    getButtonControl,
    setButtonControl,
    handleButtonLoading,
    setAlertText
  }
}
