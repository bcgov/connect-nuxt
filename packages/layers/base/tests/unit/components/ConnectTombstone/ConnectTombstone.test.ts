import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import { ref, h, nextTick } from 'vue'
import type { Ref } from 'vue'
import ConnectTombstone from '../../../../app/components/Connect/Tombstone/index.vue'
import type { ConnectTombstoneState } from '../../../../app/interfaces/connect-tombstone'
import type { ButtonProps } from '@nuxt/ui'

let mockTombstoneState: Ref<ConnectTombstoneState>

mockNuxtImport('useConnectTombstone', () => {
  return vi.fn((stateKey: string) => {
    return {
      tombstone: mockTombstoneState,
      $reset: vi.fn()
    }
  })
})

const createInitialState = (): ConnectTombstoneState => ({
  loading: false,
  title: { as: 'h2', text: '' },
  subtitles: [],
  details: [],
  sideDetails: [],
  bottomButtons: []
})

describe('ConnectTombstone.vue', () => {
  beforeEach(() => {
    // @ts-expect-error - ts complains about type being too large
    mockTombstoneState = ref(createInitialState())
  })

  it('displays the loading skeleton when loading is true', async () => {
    mockTombstoneState.value.loading = true

    const wrapper = await mountSuspended(ConnectTombstone, {
      props: { stateKey: 'test-loading' }
    })

    expect(wrapper.findAllComponents({ name: 'USkeleton' }).length).toBeGreaterThan(0)
  })

  it('displays the main content when loading is false', async () => {
    mockTombstoneState.value.title = { as: 'h2', text: 'My Test Title' }
    mockTombstoneState.value.subtitles = [{ text: 'Subtitle text' }]
    mockTombstoneState.value.sideDetails = [{ label: 'Status', value: 'Active' }]

    const wrapper = await mountSuspended(ConnectTombstone, {
      props: { stateKey: 'test-loaded' }
    })

    expect(wrapper.findComponent({ name: 'USkeleton' }).exists()).toBe(false)
    expect(wrapper.find('h2').text()).toBe('My Test Title')
    expect(wrapper.text()).toContain('Subtitle text')
    expect(wrapper.text()).toContain('Status:')
    expect(wrapper.text()).toContain('Active')
  })

  it('renders subtitles and details using the ConnectTombstoneItem component', async () => {
    mockTombstoneState.value.subtitles = [{ text: 'Sub 1' }, { text: 'Sub 2' }]
    mockTombstoneState.value.details = [{ text: 'Detail 1' }]

    const wrapper = await mountSuspended(ConnectTombstone, {
      props: { stateKey: 'test-items' }
    })

    const items = wrapper.findAllComponents({ name: 'ConnectTombstoneItem' })
    expect(items).toHaveLength(3)
  })

  it('handles button clicks and manages loading state', async () => {
    const onClickMock = vi.fn(() => new Promise(resolve => setTimeout(resolve, 50)))
    const mockButton = {
      label: 'Click Me',
      onClick: onClickMock,
      loading: false
    } as ButtonProps
    mockTombstoneState.value.bottomButtons = [{ button: mockButton }]

    const wrapper = await mountSuspended(ConnectTombstone, {
      props: { stateKey: 'test-button-click' }
    })

    vi.useFakeTimers()

    const button = wrapper.find('button')
    await button.trigger('click')

    await nextTick()

    expect(onClickMock).toHaveBeenCalledOnce()
    expect(mockButton.loading).toBe(true)
    await vi.advanceTimersByTimeAsync(50)
    expect(mockButton.loading).toBe(false)

    vi.useRealTimers()
  })

  it('renders a VNode button correctly', async () => {
    mockTombstoneState.value.bottomButtons = [
      { vNode: h('button', { class: 'my-vnode-btn' }, 'VNode Button') }
    ]

    const wrapper = await mountSuspended(ConnectTombstone, {
      props: { stateKey: 'test-vnode' }
    })

    const vnodeButton = wrapper.find('.my-vnode-btn')
    expect(vnodeButton.exists()).toBe(true)
    expect(vnodeButton.text()).toBe('VNode Button')
    expect(wrapper.findComponent({ name: 'UButton' }).exists()).toBe(false)
  })

  it('renders content passed into a slot', async () => {
    const wrapper = await mountSuspended(ConnectTombstone, {
      props: { stateKey: 'test-slot' },
      slots: {
        details: '<div class="custom-slot-content">My Custom Details</div>'
      }
    })

    const customContent = wrapper.find('.custom-slot-content')
    expect(customContent.exists()).toBe(true)
    expect(customContent.text()).toBe('My Custom Details')

    expect(wrapper.findAllComponents({ name: 'ConnectTombstoneItem' })).toHaveLength(0)
  })

  it('reactively updates from loading to loaded state', async () => {
    mockTombstoneState.value.loading = true
    const wrapper = await mountSuspended(ConnectTombstone, {
      props: { stateKey: 'test-reactive' }
    })
    expect(wrapper.findComponent({ name: 'USkeleton' }).exists()).toBe(true)

    mockTombstoneState.value.loading = false
    mockTombstoneState.value.title.text = 'Now Loaded'
    await nextTick()

    expect(wrapper.findComponent({ name: 'USkeleton' }).exists()).toBe(false)
    expect(wrapper.find('h2').text()).toBe('Now Loaded')
  })

  it('renders cleanly with no data when not loading', async () => {
    const wrapper = await mountSuspended(ConnectTombstone, {
      props: { stateKey: 'test-empty' }
    })

    expect(wrapper.find('.grow.space-y-4').exists()).toBe(true)
    expect(wrapper.find('h2').text()).toBe('')
    expect(wrapper.findAllComponents({ name: 'ConnectTombstoneItem' })).toHaveLength(0)
    expect(wrapper.find('dl').exists()).toBe(true)
    expect(wrapper.find('dd').exists()).toBe(false)
  })

  it('renders a mix of VNode and UButton components', async () => {
    mockTombstoneState.value.bottomButtons = [
      { vNode: h('a', { class: 'my-vnode-link' }, 'VNode Link') },
      { button: { label: 'Regular Button' } }
    ]

    const wrapper = await mountSuspended(ConnectTombstone, {
      props: { stateKey: 'test-mixed-buttons' }
    })

    expect(wrapper.find('.my-vnode-link').exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'UButton' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'UButton' }).props('label')).toBe('Regular Button')
  })

  it('renders content passed into the sideDetails slot', async () => {
    const wrapper = await mountSuspended(ConnectTombstone, {
      props: { stateKey: 'test-side-slot' },
      slots: {
        sideDetails: '<div class="custom-side-details">My Custom Side Details</div>'
      }
    })

    expect(wrapper.find('.custom-side-details').exists()).toBe(true)
    expect(wrapper.find('.custom-side-details').text()).toBe('My Custom Side Details')

    expect(wrapper.find('dl').exists()).toBe(false)
  })
})