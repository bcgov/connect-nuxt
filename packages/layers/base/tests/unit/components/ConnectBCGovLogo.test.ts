import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ConnectBCGovLogo from '../../../app/components/Connect/BCGovLogo.vue'
import { i18nMock } from '../mocks/i18n'

describe('<ConnectBCGovLogo />', () => {
  it('displays English logo when locale is en-CA', async () => {
    const wrapper = await mountSuspended(ConnectBCGovLogo, {
      global: {
        plugins: [i18nMock]
      }
    })

    const expectedImages = [
      'gov_bc_logo_horiz_en.png',
      'gov_bc_logo_vert_en.png'
    ]

    const images = wrapper.findAll('img')

    // renders 2 images, 1 each for large or small screens
    expect(images.length).toBe(2)
    images.forEach((image, index) => {
      expect(image.attributes('src')).includes(expectedImages[index])
      expect(image.attributes('alt')).toEqual('Government of British Columbia Logo')
    })
  })

  it('displays French logo when locale is fr-CA', async () => {
    i18nMock.global.locale.value = 'fr-CA'
    const wrapper = await mountSuspended(ConnectBCGovLogo, {
      global: {
        plugins: [i18nMock]
      }
    })

    const expectedImages = [
      'gov_bc_logo_horiz_fr.png',
      'gov_bc_logo_vert_fr.png'
    ]

    const images = wrapper.findAll('img')

    // renders 2 images, 1 each for large or small screens
    expect(images.length).toBe(2)

    images.forEach((image, index) => {
      expect(image.attributes('src')).includes(expectedImages[index])
      expect(image.attributes('alt')).toEqual('Logo du gouvernement de la Colombie-Britannique')
    })
  })

  it('fallsback to English logo when locale is not fr-CA or en-CA', async () => {
    // @ts-expect-error - i18n knows we dont have a 'ja' locale configured
    i18nMock.global.locale.value = 'ja'
    const wrapper = await mountSuspended(ConnectBCGovLogo, {
      global: {
        plugins: [i18nMock]
      }
    })

    const expectedImages = [
      'gov_bc_logo_horiz_en.png',
      'gov_bc_logo_vert_en.png'
    ]

    const images = wrapper.findAll('img')

    // renders 2 images, 1 each for large or small screens
    expect(images.length).toBe(2)
    images.forEach((image, index) => {
      expect(image.attributes('src')).includes(expectedImages[index])
      expect(image.attributes('alt')).toEqual('Government of British Columbia Logo')
    })
  })
})
