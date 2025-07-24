import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { i18nMock } from '../mocks/i18n'
import { ConnectFooter, UApp } from '#components'

describe('<ConnectFooter />', () => {
  it('Renders footer links', async () => {
    const wrapper = await mountSuspended({
      components: { ConnectFooter, UApp }, // UApp required for tooltip
      template: `
        <UApp>
          <ConnectFooter />
        </UApp>
      `
    }, {
      global: {
        plugins: [i18nMock]
      }
    })

    const linkTexts = ['Home', 'Release Notes', 'Fees', 'Disclaimer', 'Privacy', 'Accessibility', 'Copyright']
    const linkHrefs = [
      '/en-CA', // '/en-CA' - NuxtLink rendering undefined for internal route
      'https://www.release-notes.bcregistry.gov.bc.ca',
      '/product-fees',
      'https://www2.gov.bc.ca/gov/content/home/disclaimer',
      'https://www2.gov.bc.ca/gov/content/home/privacy',
      'https://www2.gov.bc.ca/gov/content/home/accessibility',
      'https://www2.gov.bc.ca/gov/content/home/copyright'
    ]

    const links = wrapper.findAll('a')
    // expect(links.length).toBe(linkTexts.length)

    links.forEach((link, index) => {
      expect(link.text()).toBe(linkTexts[index])
      expect(link.attributes('href')).toBe(linkHrefs[index])
      if (index > 0) {
        expect(link.attributes('target')).toBe('_blank')
      }
    })
  })
})
