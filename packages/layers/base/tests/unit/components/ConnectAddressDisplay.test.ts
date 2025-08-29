import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ConnectAddressDisplay from '../../../app/components/Connect/Address/Display.vue'

describe('ConnectAddressDisplay.vue', () => {
  const fullAddress = {
    street: '123 Main St',
    streetAdditional: 'Apt 101',
    city: 'Vancouver',
    region: 'BC',
    postalCode: 'V1X 1X1',
    country: 'CA',
    locationDescription: 'Near the park entrance'
  }

  it('should render a full address with all parts (textDecor)', async () => {
    const wrapper = await mountSuspended(ConnectAddressDisplay, {
      props: {
        address: fullAddress,
        omitCountry: false,
        textDecor: true
      }
    })

    const addressLines = wrapper.findAll('[data-testid="address-line"]')
    expect(addressLines.length).toBe(4)
    expect(addressLines[0].text()).toBe('123 Main St,')
    expect(addressLines[1].text()).toBe('Apt 101,')
    expect(addressLines[2].text()).toBe('Vancouver, BC\u00A0 V1X 1X1')
    expect(addressLines[3].text()).toBe('Canada')

    expect(wrapper.find('[data-testid="location-description"]').text()).toBe('Near the park entrance')
  })

  it('should handle missing street and use streetNumber/streetName', async () => {
    const address = {
      streetNumber: '123',
      streetName: 'Fake Ave',
      city: 'Burnaby',
      region: 'BC',
      postalCode: 'V1X 1X1',
      country: 'CA'
    }
    const wrapper = await mountSuspended(ConnectAddressDisplay, { props: { address } })

    const addressLines = wrapper.findAll('[data-testid="address-line"]')
    expect(addressLines.length).toBe(3)
    expect(addressLines[0].text()).toBe('123 Fake Ave')
    expect(addressLines[1].text()).toBe('Burnaby BC V1X 1X1')
    expect(addressLines[2].text()).toBe('Canada')
  })

  it('should handle unitNumber, streetNumber, streetName combined', async () => {
    const address = {
      unitNumber: '10',
      streetNumber: '123',
      streetName: 'Test Cres',
      city: 'Surrey',
      region: 'BC',
      postalCode: 'V1X 1X1',
      country: 'CA'
    }
    const wrapper = await mountSuspended(ConnectAddressDisplay, { props: { address } })

    const addressLines = wrapper.findAll('[data-testid="address-line"]')
    expect(addressLines.length).toBe(3)
    expect(addressLines[0].text()).toBe('10-123 Test Cres')
    expect(addressLines[1].text()).toBe('Surrey BC V1X 1X1')
    expect(addressLines[2].text()).toBe('Canada')
  })

  it('should omit country when omitCountry prop is true', async () => {
    const address = {
      city: 'Seattle',
      region: 'WA',
      postalCode: '98101',
      country: 'US'
    }
    const wrapper = await mountSuspended(ConnectAddressDisplay, {
      props: {
        address,
        omitCountry: true
      }
    })

    const addressLines = wrapper.findAll('[data-testid="address-line"]')
    expect(addressLines.length).toBe(1)
    expect(addressLines[0].text()).toBe('Seattle WA 98101')
  })

  it('should handle minimal address parts (city and country only)', async () => {
    const address = {
      city: 'Townsville',
      country: 'CA'
    }
    const wrapper = await mountSuspended(ConnectAddressDisplay, { props: { address } })

    const addressLines = wrapper.findAll('[data-testid="address-line"]')
    expect(addressLines.length).toBe(2)
    expect(addressLines[0].text()).toBe('Townsville')
    expect(addressLines[1].text()).toBe('Canada')
  })

  it('should handle empty address object', async () => {
    const address = {}
    const wrapper = await mountSuspended(ConnectAddressDisplay, { props: { address } })

    expect(wrapper.findAll('[data-testid="address-line"]').length).toBe(0)
    expect(wrapper.find('[data-testid="location-description"]').exists()).toBe(false)
  })

  it('should handle address with only street and city', async () => {
    const address = {
      street: '789 Birch Ave',
      city: 'Kelowna'
    }
    const wrapper = await mountSuspended(ConnectAddressDisplay, { props: { address } })

    const addressLines = wrapper.findAll('[data-testid="address-line"]')
    expect(addressLines.length).toBe(2)
    expect(addressLines[0].text()).toBe('789 Birch Ave')
    expect(addressLines[1].text()).toBe('Kelowna')
  })

  it('should render locationDescription when provided', async () => {
    const address = {
      city: 'Test City',
      country: 'CA',
      locationDescription: 'Main entrance at back of building'
    }
    const wrapper = await mountSuspended(ConnectAddressDisplay, { props: { address } })

    expect(wrapper.find('[data-testid="location-description"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="location-description"]').text()).toBe('Main entrance at back of building')
  })

  it('should not render locationDescription when not provided', async () => {
    const address = {
      city: 'Test City',
      country: 'CA'
    }
    const wrapper = await mountSuspended(ConnectAddressDisplay, { props: { address } })

    expect(wrapper.find('[data-testid="location-description"]').exists()).toBe(false)
  })
})
