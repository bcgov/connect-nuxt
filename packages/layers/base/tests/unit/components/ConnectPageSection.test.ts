import { describe, test, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ConnectPageSection from '../../../app/components/Connect/PageSection.vue'

// --- Mock Child Components ---
// We mock the Nuxt UI components to isolate our ConnectPageSection component.
const MockUCard = {
  template: `
    <div>
      <div class="header"><slot name="header" /></div>
      <div class="body"><slot /></div>
      <div class="footer"><slot name="footer" /></div>
    </div>
  `,
  props: ['as', 'class', 'variant', 'ui']
}

const MockUButton = {
  template: '<button><slot /></button>',
  props: ['label', 'variant', 'color'] // Add any props your actions might use
}

const MockUIcon = {
  template: '<i></i>',
  props: ['name', 'class']
}

describe('ConnectPageSection Component', () => {
  const stubs = {
    UCard: MockUCard,
    UButton: MockUButton,
    UIcon: MockUIcon
  }

  test('renders the default slot content', async () => {
    const wrapper = await mountSuspended(ConnectPageSection, {
      global: { stubs },
      slots: {
        default: '<p>This is the body content</p>'
      }
    })

    expect(wrapper.find('.body').html()).toContain('<p>This is the body content</p>')
  })

  test('does not render the header if no label or header slot is provided', async () => {
    const wrapper = await mountSuspended(ConnectPageSection, {
      global: { stubs }
    })

    expect(wrapper.find('.header').html()).toBe('<div class="header"></div>')
  })

  describe('Heading Prop', () => {
    test('renders the heading label with a default h2 tag', async () => {
      const wrapper = await mountSuspended(ConnectPageSection, {
        global: { stubs },
        props: {
          heading: { label: 'My Section Title' }
        }
      })

      const heading = wrapper.find('h2')
      expect(heading.exists()).toBe(true)
      expect(heading.text()).toBe('My Section Title')
    })

    test('renders the heading with a custom level', async () => {
      const wrapper = await mountSuspended(ConnectPageSection, {
        global: { stubs },
        props: {
          heading: { label: 'My H3 Title', level: 'h3' }
        }
      })

      expect(wrapper.find('h2').exists()).toBe(false)
      const heading = wrapper.find('h3')
      expect(heading.exists()).toBe(true)
      expect(heading.text()).toBe('My H3 Title')
    })

    test('renders the heading icon with default classes', async () => {
      const wrapper = await mountSuspended(ConnectPageSection, {
        global: { stubs },
        props: {
          heading: { label: 'Title with Icon', icon: 'i-mdi-home' }
        }
      })

      const icon = wrapper.findComponent(MockUIcon)
      expect(icon.exists()).toBe(true)
      expect(icon.props('name')).toBe('i-mdi-home')
      expect(icon.props('class')).toBe('size-6 shrink-0 text-primary')
    })

    test('applies custom classes to the heading label and icon', async () => {
      const wrapper = await mountSuspended(ConnectPageSection, {
        global: { stubs },
        props: {
          heading: {
            label: 'Custom Title',
            icon: 'i-mdi-settings',
            labelClass: 'my-custom-label-class',
            iconClass: 'my-custom-icon-class'
          }
        }
      })

      expect(wrapper.find('span').classes()).toContain('my-custom-label-class')
      expect(wrapper.findComponent(MockUIcon).props('class')).toBe('my-custom-icon-class')
    })
  })

  describe('Actions Prop', () => {
    test('renders multiple action buttons with correct props', async () => {
      const actions = [
        { label: 'Cancel', variant: 'outline', color: 'red' },
        { label: 'Save', variant: 'solid', color: 'primary' }
      ]
      const wrapper = await mountSuspended(ConnectPageSection, {
        global: { stubs },
        props: {
          heading: { label: 'Actions Test' },
          actions
        }
      })

      const buttons = wrapper.findAllComponents(MockUButton)
      expect(buttons).toHaveLength(2)
      expect(buttons[0].props('label')).toBe('Cancel')
      expect(buttons[0].props('variant')).toBe('outline')
      expect(buttons[1].props('label')).toBe('Save')
      expect(buttons[1].props('color')).toBe('primary')
    })
  })

  describe('Slots', () => {
    test('renders the header slot instead of the default header structure', async () => {
      const wrapper = await mountSuspended(ConnectPageSection, {
        global: { stubs },
        props: {
          heading: { label: 'This will be ignored' }
        },
        slots: {
          header: '<div class="custom-header">My Custom Header</div>'
        }
      })

      expect(wrapper.find('h2').exists()).toBe(false)
      expect(wrapper.find('.custom-header').exists()).toBe(true)
      expect(wrapper.find('.custom-header').text()).toBe('My Custom Header')
    })
  })

  describe('UI Props', () => {
    test('applies default UI classes to UCard', async () => {
      const wrapper = await mountSuspended(ConnectPageSection, {
        global: { stubs }
      })

      const card = wrapper.findComponent(MockUCard)
      expect(card.props('ui').header).toContain('bg-shadeSecondary')
      expect(card.props('ui').body).toBe('p-0 sm:p-0')
    })

    test('applies custom UI classes to UCard', async () => {
      const wrapper = await mountSuspended(ConnectPageSection, {
        global: { stubs },
        props: {
          heading: { label: 'Custom UI', ui: 'my-custom-header-class' },
          uiBody: 'my-custom-body-class'
        }
      })

      const card = wrapper.findComponent(MockUCard)
      expect(card.props('ui').header).toBe('my-custom-header-class')
      expect(card.props('ui').body).toBe('my-custom-body-class')
    })
  })
})
