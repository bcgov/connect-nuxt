const defaultOptions: ConnectButtonControlOptions = {
  handleLoading: true,
  clearAlertTextOnClick: true
}

export const useConnectButtonControl = (
  stateKey: string = 'default-button-control',
  opts: Partial<ConnectButtonControlOptions> = {}
) => {
  const options = {
    ...defaultOptions,
    ...opts
  }

  const buttonControl = useState<ConnectButtonControl>(stateKey, () => ({
    leftGroup: { buttons: [] },
    rightGroup: { buttons: [] }
  }))

  const forEachButton = (update: (button: ConnectButton, group: 'left' | 'right', index: number) => void) => {
    buttonControl.value.leftGroup?.buttons?.forEach((btn, index) => update(btn, 'left', index))
    buttonControl.value.rightGroup?.buttons?.forEach((btn, index) => update(btn, 'right', index))
  }

  const forEachGroup = (update: (group: ConnectButtonGroup) => void) => {
    if (buttonControl.value.leftGroup) {
      update(buttonControl.value.leftGroup)
    }
    if (buttonControl.value.rightGroup) {
      update(buttonControl.value.rightGroup)
    }
  }

  async function setAlertText(text?: string, group?: 'left' | 'right', index?: number) {
    forEachGroup(group => group.alertText = undefined)
    forEachButton(btn => btn.alertText = undefined)

    if (text && group !== undefined) {
      await nextTick()

      const buttonGroup = group === 'left' ? buttonControl.value.leftGroup : buttonControl.value.rightGroup

      if (index !== undefined) {
        const button = buttonGroup.buttons[index]
        if (button) {
          button.alertText = text
        }
      } else {
        buttonGroup.alertText = text
      }
    }
  }

  const handleClick = (
    originalClick: ConnectButton['onClick'],
    group: 'left' | 'right',
    index: number
  ) => {
    if (!originalClick || typeof originalClick !== 'function') {
      return undefined
    }

    return async () => {
      try {
        if (options.clearAlertTextOnClick) {
          await setAlertText(undefined)
        }

        if (options.handleLoading) {
          const clickedButton = buttonControl.value[group === 'left' ? 'leftGroup' : 'rightGroup']?.buttons[index]
          if (!clickedButton) {
            return
          }

          clickedButton.loading = true
          forEachButton((button, btnGroup, btnIndex) => {
            if (btnGroup !== group || btnIndex !== index) {
              button.disabled = true
            }
          })
        }

        await (originalClick as () => Promise<void> | void)()
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error(`Error on button click. group: ${group} index: ${index} error: ${error}`)
        }
      } finally {
        if (options.handleLoading) {
          forEachButton((button) => {
            button.loading = false
            button.disabled = false
          })
        }
      }
    }
  }

  function setButtonControl(config: ConnectButtonControl) {
    const updateGroup = (config: { buttons: ConnectButton[] }, group: 'left' | 'right') => {
      if (!config || !config.buttons.length) {
        return { ...config, buttons: [] }
      }
      return {
        ...config,
        buttons: config.buttons.map((button, index) => ({
          ...button,
          onClick: handleClick(button.onClick, group, index)
        }))
      }
    }

    buttonControl.value = {
      leftGroup: updateGroup(config.leftGroup, 'left'),
      rightGroup: updateGroup(config.rightGroup, 'right')
    }
  }

  function handleButtonLoading(
    loading: boolean,
    group?: 'left' | 'right',
    index?: number
  ) {
    if (!loading) {
      forEachButton((button) => {
        button.loading = false
        button.disabled = false
      })
    } else if (group !== undefined && index !== undefined) {
      forEachButton((button, btnGroup, btnIndex) => {
        if (btnGroup === group && btnIndex === index) {
          button.loading = true
        } else {
          button.disabled = true
        }
      })
    }
  }

  return {
    setButtonControl,
    setAlertText,
    handleButtonLoading,
    buttonControl
  }
}
