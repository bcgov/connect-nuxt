import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ConnectTombstoneItem from '../../../../app/components/Connect/Tombstone/Item.vue'

describe('<ConnectTombstoneItem />', () => {
  it('renders a plain text paragraph by default', async () => {
    const wrapper = await mountSuspended(ConnectTombstoneItem, {
      props: { text: 'Hello World' }
    })

    const p = wrapper.find('p')
    expect(p.exists()).toBe(true)
    expect(p.text()).toBe('Hello World')
    expect(p.classes()).toContain('mt-[2px]')
  })

  it('renders an icon when icon prop is provided', async () => {
    const iconProps = { name: 'i-mdi-check' }
    const wrapper = await mountSuspended(ConnectTombstoneItem, {
      props: { icon: iconProps }
    })

    expect(wrapper.find('p').exists()).toBe(false)
    const icon = wrapper.findComponent({ name: 'UIcon' })
    expect(icon.exists()).toBe(true)
    expect(icon.props()).toEqual(iconProps)
    expect(icon.classes()).toContain('mt-1')
  })

  it('renders a badge when badge prop is provided', async () => {
    const badgeProps = { label: 'Active', color: 'green' }
    const wrapper = await mountSuspended(ConnectTombstoneItem, {
      props: { badge: badgeProps }
    })

    expect(wrapper.find('p').exists()).toBe(false)
    const badge = wrapper.findComponent({ name: 'UBadge' })
    expect(badge.exists()).toBe(true)
    expect(badge.props()).toEqual(expect.objectContaining(badgeProps))
    expect(badge.classes()).toContain('px-3')
  })

  it('renders a link when link prop is provided', async () => {
    const linkProps = { label: 'Click Me', to: '/home' }
    const wrapper = await mountSuspended(ConnectTombstoneItem, {
      props: { link: linkProps }
    })

    expect(wrapper.find('p').exists()).toBe(false)
    const link = wrapper.findComponent({ name: 'ULink' })
    expect(link.exists()).toBe(true)
    expect(link.props()).toEqual(expect.objectContaining({ to: '/home' }))
    expect(link.text()).toBe('Click Me')
  })

  it('renders a VNode when vNode prop is provided', async () => {
    const vNode = h('button', { class: 'my-button' }, 'VNode Button')
    const wrapper = await mountSuspended(ConnectTombstoneItem, {
      props: { vNode }
    })

    expect(wrapper.find('p').exists()).toBe(false)
    const button = wrapper.find('.my-button')
    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('VNode Button')
  })

  it('uses a custom itemClass when provided', async () => {
    const customClass = 'text-red-500 font-bold'
    const wrapper = await mountSuspended(ConnectTombstoneItem, {
      props: {
        text: 'Custom Styled Text',
        itemClass: customClass
      }
    })

    const p = wrapper.find('p')
    expect(p.classes()).toContain('text-red-500')
    expect(p.classes()).toContain('font-bold')
    // default class not used
    expect(p.classes()).not.toContain('mt-[2px]')
  })

  it('should render an icon with a badge', async () => {
    const wrapper = await mountSuspended(ConnectTombstoneItem, {
      props: {
        icon: { name: 'i-mdi-check' },
        badge: { label: 'Should not render' },
        link: { label: 'Should not render', to: '/' },
        vNode: h('button', { class: 'my-button' }, 'VNode Button'),
        text: 'Hello World'
      }
    })

    // icon and badge should render 
    expect(wrapper.findComponent({ name: 'UIcon' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'UBadge' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'ULink' }).exists()).toBe(false)
    expect(wrapper.find('p').exists()).toBe(false)
    expect(wrapper.find('button').exists()).toBe(false)
    expect(wrapper).not.toContain('Hello World')
  })
  
  it('should render an icon with a link', async () => {
    const wrapper = await mountSuspended(ConnectTombstoneItem, {
      props: {
        icon: { name: 'i-mdi-check' },
        link: { label: 'Should not render', to: '/' },
        vNode: h('button', { class: 'my-button' }, 'VNode Button'),
        text: 'Hello World'
      }
    })

    // icon and link should render 
    expect(wrapper.findComponent({ name: 'UIcon' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'ULink' }).exists()).toBe(true)
    expect(wrapper.find('p').exists()).toBe(false)
    expect(wrapper.find('button').exists()).toBe(false)
    expect(wrapper).not.toContain('Hello World')
  })
  
  it('should render an icon with a vNode', async () => {
    const wrapper = await mountSuspended(ConnectTombstoneItem, {
      props: {
        icon: { name: 'i-mdi-check' },
        vNode: h('button', { class: 'my-button' }, 'VNode Button'),
        text: 'Hello World'
      }
    })

    // icon and button should render 
    expect(wrapper.findComponent({ name: 'UIcon' }).exists()).toBe(true)
    expect(wrapper.find('p').exists()).toBe(false)
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.html()).toContain('VNode Button')
    expect(wrapper).not.toContain('Hello World')
  })
  
  it('should render an icon with a plain text', async () => {
    const wrapper = await mountSuspended(ConnectTombstoneItem, {
      props: {
        icon: { name: 'i-mdi-check' },
        text: 'Hello World'
      }
    })

    // icon and text should render
    expect(wrapper.findComponent({ name: 'UIcon' }).exists()).toBe(true)
    expect(wrapper.find('p').exists()).toBe(true)
    expect(wrapper.html()).toContain('Hello World')
  })
})