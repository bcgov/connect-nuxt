/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'

const stateMap = new Map<string, Ref<any>>()
mockNuxtImport('useState', () => {
  return vi.fn((key: string, init: () => any) => {
    if (!stateMap.has(key)) {
      stateMap.set(key, ref(init()))
    }
    return stateMap.get(key)
  })
})

const mockLeftClick1 = vi.fn(() => Promise.resolve())
const mockLeftClick2 = vi.fn()
const mockRightClick1 = vi.fn(() => new Promise(resolve => setTimeout(resolve, 50)))
const mockRightClick2 = vi.fn()

const config: ConnectButtonControl = {
  leftGroup: {
    buttons: [
      { label: 'Left 1', onClick: mockLeftClick1 },
      { label: 'Left 2', onClick: mockLeftClick2, disabled: true }
    ]
  },
  rightGroup: {
    buttons: [
      // @ts-expect-error - ignore mock not matching onClick type
      { label: 'Right 1', onClick: mockRightClick1, loading: true, disabled: true },
      { label: 'Right 2', onClick: mockRightClick2 }
    ]
  }
}

describe('useConnectButtonControl', () => {
  beforeEach(() => {
    stateMap.clear()
    mockLeftClick1.mockClear()
    mockRightClick1.mockClear()
    vi.clearAllMocks()
  })

  it('should initialize with default state', () => {
    const { buttonControl } = useConnectButtonControl()
    expect(buttonControl.value).toEqual({
      leftGroup: { buttons: [] },
      rightGroup: { buttons: [] }
    })
  })

  it('should return the same state for the same key', () => {
    const btnCtrl1 = useConnectButtonControl('shared-key')
    const btnCtrl2 = useConnectButtonControl('shared-key')
    expect(btnCtrl1.buttonControl).toBe(btnCtrl2.buttonControl)
  })

  it('should return different state for different keys', () => {
    const btnCtrl1 = useConnectButtonControl('1')
    const btnCtrl2 = useConnectButtonControl('2')
    expect(btnCtrl1.buttonControl).not.toBe(btnCtrl2.buttonControl)
  })

  describe('setButtonControl', () => {
    it('should set the button config', () => {
      const { setButtonControl, buttonControl } = useConnectButtonControl()
      setButtonControl(config)
      expect(buttonControl.value.leftGroup.buttons[0]!.label).toBe('Left 1')
      expect(buttonControl.value.rightGroup.buttons[1]!.label).toBe('Right 2')
      expect(buttonControl.value.leftGroup.buttons[1]!.disabled).toBe(true)
    })
  })

  describe('handleClick', () => {
    it('should handle loading/disabled state internally', async () => {
      const { setButtonControl, buttonControl } = useConnectButtonControl()

      setButtonControl(config)

      const click = buttonControl.value.rightGroup.buttons[0]?.onClick
      expect(click).toBeDefined()

      // @ts-expect-error - mock doesnt match onClick type
      const promise = click!()

      await nextTick()

      expect(buttonControl.value.rightGroup.buttons[0]?.loading).toBe(true)
      expect(buttonControl.value.rightGroup.buttons[1]?.disabled).toBe(true)
      expect(buttonControl.value.leftGroup.buttons[0]?.disabled).toBe(true)
      expect(buttonControl.value.leftGroup.buttons[1]?.disabled).toBe(true)

      await promise

      expect(buttonControl.value.rightGroup.buttons[0]?.loading).toBe(false)
      expect(buttonControl.value.rightGroup.buttons[0]?.disabled).toBe(false)
      expect(buttonControl.value.rightGroup.buttons[1]?.disabled).toBe(false)
      expect(buttonControl.value.leftGroup.buttons[0]?.disabled).toBe(false)
      expect(buttonControl.value.leftGroup.buttons[1]?.disabled).toBe(false)

      expect(mockRightClick1).toHaveBeenCalledTimes(1)
    })

    it('should not handle loading/disabled state when option is false', async () => {
      const { setButtonControl, buttonControl } = useConnectButtonControl('default', { handleLoading: false })

      setButtonControl(config)

      // @ts-expect-error - mock not matching onClick type
      await buttonControl.value.rightGroup.buttons[0].onClick()

      expect(buttonControl.value.rightGroup.buttons[0]?.loading).toBe(true) // still has default state
      expect(buttonControl.value.rightGroup.buttons[0]?.disabled).toBe(true) // still has default state
      expect(buttonControl.value.leftGroup.buttons[0]?.disabled).toBe(undefined) // still has default state

      expect(mockRightClick1).toHaveBeenCalledTimes(1)
    })

    it('should clear alerts by default', async () => {
      const { setButtonControl, buttonControl } = useConnectButtonControl()

      setButtonControl(config)

      buttonControl.value.leftGroup.alertText = 'Group Alert'
      buttonControl.value.rightGroup.buttons[1]!.alertText = 'Button Alert'
      expect(buttonControl.value.leftGroup.alertText).toBe('Group Alert')
      expect(buttonControl.value.rightGroup.buttons[1]!.alertText).toBe('Button Alert')

      // @ts-expect-error - mock not matching onClick type
      await buttonControl.value.leftGroup.buttons[0].onClick()

      expect(buttonControl.value.leftGroup.alertText).toBeUndefined()
      expect(buttonControl.value.rightGroup.buttons[1]!.alertText).toBeUndefined()
      expect(mockLeftClick1).toHaveBeenCalledTimes(1)
    })

    it('should not clear alerts when option is false', async () => {
      const { setButtonControl, buttonControl } = useConnectButtonControl('default', { clearAlertTextOnClick: false })
      setButtonControl(config)

      buttonControl.value.leftGroup.alertText = 'Group Alert'
      buttonControl.value.rightGroup.buttons[1]!.alertText = 'Button Alert'

      expect(buttonControl.value.leftGroup.alertText).toBe('Group Alert')
      expect(buttonControl.value.rightGroup.buttons[1]!.alertText).toBe('Button Alert')

      // @ts-expect-error - mock not matching onClick type
      await buttonControl.value.leftGroup.buttons[0].onClick()

      expect(buttonControl.value.leftGroup.alertText).toBe('Group Alert')
      expect(buttonControl.value.rightGroup.buttons[1]!.alertText).toBe('Button Alert')
      expect(mockLeftClick1).toHaveBeenCalledTimes(1)
    })
  })

  describe('setAlertText', () => {
    it('should set group alert text and clear others', async () => {
      const { setAlertText, buttonControl } = useConnectButtonControl('alert-group')
      buttonControl.value = {
        leftGroup: { buttons: [{ label: 'Left 1', alertText: 'Old Button Alert' }] },
        rightGroup: { buttons: [], alertText: 'Old Group Alert' }
      }

      await setAlertText('New Left Alert', 'left')

      expect(buttonControl.value.leftGroup?.alertText).toBe('New Left Alert')
      expect(buttonControl.value.rightGroup?.alertText).toBeUndefined()
      expect(buttonControl.value.leftGroup?.buttons[0]?.alertText).toBeUndefined()
    })

    it('should set button alert text and clear others', async () => {
      const { setAlertText, buttonControl } = useConnectButtonControl('alert-button')
      buttonControl.value = {
        leftGroup: { buttons: [{ label: 'Left 1' }], alertText: 'Old Group Alert' },
        rightGroup: { buttons: [{ label: 'Right 1' }] }
      }

      await setAlertText('New Button Alert', 'left', 0)

      expect(buttonControl.value.leftGroup?.buttons[0]?.alertText).toBe('New Button Alert')
      expect(buttonControl.value.leftGroup?.alertText).toBeUndefined()
      expect(buttonControl.value.rightGroup?.alertText).toBeUndefined()
    })

    it('should clear alerts when triggered with no args', async () => {
      const { setAlertText, buttonControl } = useConnectButtonControl('alert-clear')
      buttonControl.value = {
        leftGroup: { buttons: [{ label: 'Left 1', alertText: 'Button Alert' }], alertText: 'Group Left Alert' },
        rightGroup: { buttons: [], alertText: 'Group Right Alert' }
      }

      await setAlertText()

      expect(buttonControl.value.leftGroup?.alertText).toBeUndefined()
      expect(buttonControl.value.rightGroup?.alertText).toBeUndefined()
      expect(buttonControl.value.leftGroup?.buttons[0]?.alertText).toBeUndefined()
    })
  })

  describe('handleButtonLoading', () => {
    it('should be able to manually set button loading and others to disabled', () => {
      const { handleButtonLoading, buttonControl, setButtonControl } = useConnectButtonControl()

      setButtonControl(config)

      handleButtonLoading(true, 'left', 0)

      expect(buttonControl.value.leftGroup.buttons[0]!.loading).toBe(true)
      expect(buttonControl.value.leftGroup.buttons[1]!.disabled).toBe(true)
      expect(buttonControl.value.rightGroup.buttons[0]!.disabled).toBe(true)
      expect(buttonControl.value.rightGroup.buttons[1]!.disabled).toBe(true)
    })

    it('should be able to reset loading/disabled for all buttons', () => {
      const { handleButtonLoading, buttonControl, setButtonControl } = useConnectButtonControl()

      setButtonControl(config)

      buttonControl.value.leftGroup.buttons[0]!.loading = true
      buttonControl.value.leftGroup.buttons[0]!.disabled = true
      buttonControl.value.rightGroup.buttons[1]!.disabled = true

      handleButtonLoading(false)

      expect(buttonControl.value.leftGroup.buttons[0]!.loading).toBe(false)
      expect(buttonControl.value.leftGroup.buttons[0]!.disabled).toBe(false)
      expect(buttonControl.value.leftGroup.buttons[1]!.disabled).toBe(false)
      expect(buttonControl.value.rightGroup.buttons[0]!.disabled).toBe(false)
      expect(buttonControl.value.rightGroup.buttons[1]!.disabled).toBe(false)
    })
  })
})
