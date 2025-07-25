import { describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import ConnectHeader from '../../../app/components/Connect/Header/index.vue'

const setLocaleMock = vi.fn()
mockNuxtImport('useI18n', () => {
  return () => (
    {
      locale: 'en-CA',
      locales: ref([
        {
          name: 'English',
          code: 'en-CA',
          iso: 'en-CA',
          dir: 'ltr',
          file: 'en-CA.ts'
        },
        {
          name: 'French',
          code: 'fr-CA',
          iso: 'fr-CA',
          dir: 'ltr',
          file: 'fr-CA.ts'
        }
      ]),
      t: (key: string) => key,
      setLocale: setLocaleMock
    }
  )
})

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
