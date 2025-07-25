import { describe, test, expect, afterEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ConnectSpinner from '../../../app/components/Connect/Spinner.vue'

describe('ConnectSpinner Component', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('renders as an absolute positioned spinner by default', async () => {
    const wrapper = await mountSuspended(ConnectSpinner)

    const spinner = wrapper.find('svg')
    expect(spinner.exists()).toBe(true)
    expect(spinner.classes()).toContain('absolute')

    expect(document.body.querySelector('.spinner')).toBeNull()
  })

  test('renders as a fixed overlay when overlay prop is true', async () => {
    const wrapper = await mountSuspended(ConnectSpinner, {
      props: {
        fullscreen: true
      },
      attachTo: document.body
    })

    expect(wrapper.html()).toContain('<!--teleport start-->')
    expect(wrapper.html()).toContain('<!--teleport end-->')
    const htmlSvg = wrapper.find('svg')
    expect(htmlSvg.exists()).toBe(false)

    const overlayDiv = document.body.querySelector('.fixed.inset-0')
    const spinnerSvg = document.body.querySelector('svg.spinner.fixed')

    expect(overlayDiv).not.toBeNull()
    expect(spinnerSvg).not.toBeNull()

    expect(overlayDiv?.classList.contains('bg-gray-100')).toBe(true)
  })

  test('does not render when overlay prop is false', async () => {
    const wrapper = await mountSuspended(ConnectSpinner, {
      props: {
        fullscreen: false
      }
    })

    const spinner = wrapper.find('svg')
    expect(spinner.exists()).toBe(true)
    expect(spinner.classes()).toContain('absolute')

    expect(document.body.querySelector('.spinner')).toBeNull()
  })
})
