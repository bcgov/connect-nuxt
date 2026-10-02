import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { ConnectHeader } from '#components'

describe('<ConnectHeader />', () => {
  it('renders when authenticated', async () => {
    const wrapper = await mountSuspended(ConnectHeader)

    expect(wrapper).toBeDefined()

    // logo link should be rendered
    const homeLogoLink = wrapper.find('#header-logo-home-link')
    expect(homeLogoLink.exists()).toBe(true)

    // locale select should be rendered
    const localeSelectDropdown = wrapper.find('[data-testid="locale-select-dropdown"]')
    expect(localeSelectDropdown).toBeDefined()

    // header title should be Service BC Connect
    expect(wrapper.html()).toContain('Service BC Connect')
  })
})
