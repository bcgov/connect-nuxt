import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { ConnectContactDisplay } from '#components'

describe('<ConnectContactDisplay />', () => {
  const singleEmailContact: ConnectContactItem = {
    type: 'email',
    title: 'Email:',
    value: 'test@example.com',
    href: 'mailto:test@example.com'
  }

  const multipleContacts: ConnectContactItem[] = [
    {
      type: 'phone',
      title: 'Phone:',
      value: '250-123-4567',
      href: 'tel:+1-250-123-4567'
    },
    {
      type: 'fax',
      title: 'Fax:',
      value: '250-987-6543'
    },
    {
      type: 'email',
      title: 'Support:',
      value: 'support@example.com',
      href: 'mailto:support@example.com'
    }
  ]

  it('renders a single contact without a list', async () => {
    const wrapper = await mountSuspended(ConnectContactDisplay, {
      props: { contact: singleEmailContact }
    })

    // shouldnt render list with 1 item
    expect(wrapper.find('ul').exists()).toBe(false)

    // renders expected text
    expect(wrapper.text()).toContain('Email:')
    expect(wrapper.text()).toContain('test@example.com')

    // renders expected icon
    const icon = wrapper.findComponent({ name: 'UIcon' })
    expect(icon.attributes('class')).toContain('i-mdi:email')
  })

  it('renders multiple contacts as a list', async () => {
    const wrapper = await mountSuspended(ConnectContactDisplay, {
      props: { contact: multipleContacts }
    })

    // should render list
    const list = wrapper.find('ul')
    expect(list.exists()).toBe(true)

    // li count should match contact count
    const listItems = list.findAll('li')
    expect(listItems).toHaveLength(multipleContacts.length)

    // assert phone contact
    const phoneItem = listItems[0]!
    const phoneIcon = phoneItem.findComponent({ name: 'UIcon' })
    expect(phoneItem.text()).toContain('Phone:')
    expect(phoneItem.text()).toContain('250-123-4567')
    expect(phoneIcon.attributes('class')).toContain('i-mdi:phone')

    // assert fax item
    const faxItem = listItems[1]!
    const faxIcon = faxItem.findComponent({ name: 'UIcon' })
    expect(faxItem.text()).toContain('Fax:')
    expect(faxItem.text()).toContain('250-987-6543')
    expect(faxIcon.attributes('class')).toContain('i-mdi:fax')

    // assert email item
    const emailItem = listItems[2]!
    const emailIcon = emailItem.findComponent({ name: 'UIcon' })
    expect(emailItem.text()).toContain('Support:')
    expect(emailItem.text()).toContain('support@example.com')
    expect(emailIcon.attributes('class')).toContain('i-mdi:email')
  })

  it('renders a fax number without a link', async () => {
    const wrapper = await mountSuspended(ConnectContactDisplay, {
      props: { contact: multipleContacts }
    })

    const faxItem = wrapper.findAll('li')[1]!

    expect(faxItem.find('a').exists()).toBe(false)
    expect(faxItem.text()).toContain('Fax: 250-987-6543')
  })

  it('renders an email with target="_blank"', async () => {
    const wrapper = await mountSuspended(ConnectContactDisplay, {
      props: { contact: multipleContacts }
    })

    const emailItem = wrapper.findAll('li')[2]!
    const link = emailItem.find('a')
    expect(link.attributes('target')).toBe('_blank')
  })

  it('renders a phone link without a target', async () => {
    const wrapper = await mountSuspended(ConnectContactDisplay, {
      props: { contact: multipleContacts }
    })

    const phoneItem = wrapper.findAll('li')[0]!
    const link = phoneItem.find('a')
    expect(link.attributes('target')).toBeUndefined()
  })

  it('renders the hours of operation when the "hours" prop is provided', async () => {
    const hoursText = 'Monday to Friday, 9am to 5pm'
    const wrapper = await mountSuspended(ConnectContactDisplay, {
      props: {
        contact: singleEmailContact,
        hours: hoursText
      }
    })

    const hoursEl = wrapper.find('p')
    expect(hoursEl.exists()).toBe(true)
    expect(hoursEl.text()).toContain('Hours of Operation')
    expect(hoursEl.text()).toContain(hoursText)
  })

  it('does not render the hours of operation when missing the "hours" prop', async () => {
    const wrapper = await mountSuspended(ConnectContactDisplay, {
      props: { contact: singleEmailContact }
    })

    expect(wrapper.find('p').exists()).toBe(false)
  })
})
