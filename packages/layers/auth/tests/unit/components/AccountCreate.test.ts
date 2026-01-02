/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import { reactive } from 'vue'
import { z } from 'zod'
import { ConnectAccountCreate, ConnectAccountCreateName } from '#components'

/** Store mock */
const accountFormState = reactive({
  accountName: 'My Account',
  emailAddress: 'me@example.com',
  phone: {
    countryCode: '+1',
    countryIso2: 'CA',
    phoneNumber: '(123) 456-7890',
    ext: ''
  },
  address: {}
})

mockNuxtImport('useConnectAccountStore', () => () => ({
  accountFormState,
  userFullName: 'MockUser Abc123'
}))

/** Schema utility mock */
vi.mock('#auth/app/utils/schemas/account', () => {
  return {
    getAccountCreateSchema: vi.fn(() =>
      z.object({
        accountName: z.string(),
        emailAddress: z.string().email(),
        phone: z.object({
          countryCode: z.string(),
          countryIso2: z.string(),
          phoneNumber: z.string(),
          ext: z.string().optional()
        }),
        address: z.any()
      })
    )
  }
})

/** Child component stubs */
const globalStubs = {
  UForm: {
    name: 'UForm',
    props: ['schema', 'state'],
    template: '<form data-test="uform"><slot /></form>',
    methods: {
      getErrors: vi.fn(() => []),
      validate: vi.fn(async () => ({ valid: true }))
    }
  },
  ConnectPageSection: {
    name: 'ConnectPageSection',
    template: '<section><slot /></section>'
  },
  USeparator: {
    name: 'USeparator',
    template: '<hr />'
  },
  ConnectFormInput: {
    name: 'ConnectFormInput',
    props: ['modelValue', 'name', 'inputId', 'label', 'help', 'mask'],
    emits: ['update:modelValue'],
    template: `
      <div class="connect-form-input">
        <label :for="inputId">{{ label }}</label>
        <input :id="inputId" :name="name" :value="modelValue" />
        <small v-if="help">{{ help }}</small>
      </div>
    `
  },
  ConnectFormPhoneCountryCode: {
    name: 'ConnectFormPhoneCountryCode',
    props: ['countryCallingCode', 'countryIso2', 'isInvalid'],
    emits: ['update:countryCallingCode', 'update:countryIso2'],
    template: '<div class="phone-country-code"></div>'
  },
  ConnectFormAddress: {
    name: 'ConnectFormAddress',
    props: ['modelValue', 'name', 'schemaPrefix'],
    emits: ['should-validate'],
    template: '<div data-test="address" @click="$emit(\'should-validate\')"></div>'
  }
}

describe('ConnectAccountCreate', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  /** Mount Helper */
  async function mount() {
    return await mountSuspended(ConnectAccountCreate, {
      global: {
        stubs: globalStubs,
        config: {
          globalProperties: {
            $t: (key: string) => key
          } as any
        }
      }
    })
  }

  it('should display legal name label and userFullName', async () => {
    const wrapper = await mount()
    expect(wrapper.text()).toContain('connect.page.createAccount.yourNameLabel')
    expect(wrapper.text()).toContain('MockUser Abc123')
    expect(wrapper.text()).toContain('connect.page.createAccount.yourNameHelp')
  })

  it('should render Account Name component', async () => {
    const wrapper = await mount()
    expect(wrapper.findComponent(ConnectAccountCreateName).exists()).toBe(true)
  })

  it('should render Email label and bind value to the input', async () => {
    const wrapper = await mount()
    expect(wrapper.text()).toContain('connect.page.createAccount.emailPlaceholder')

    const input = wrapper.find('#email-input')
    expect(input.exists()).toBe(true)
    expect((input.element as HTMLInputElement).value).toBe('me@example.com')
  })

  it('should render Phone section and extension label', async () => {
    const wrapper = await mount()

    expect(wrapper.text()).toContain('connect.page.createAccount.phoneLabel')
    expect(wrapper.text()).toContain('connect.page.createAccount.phonePlaceholder')
    expect(wrapper.text()).toContain('connect.page.createAccount.phoneExtensionLabel')

    const phoneNumberInput = wrapper.find('#phone-number-input')
    expect(phoneNumberInput.exists()).toBe(true)
    expect((phoneNumberInput.element as HTMLInputElement).value).toBe('(123) 456-7890')

    const phoneExtInput = wrapper.find('#phone-ext-input')
    expect(phoneExtInput.exists()).toBe(true)
    expect((phoneExtInput.element as HTMLInputElement).value).toBe('')
  })

  it('should mount UForm with schema and state', async () => {
    const wrapper = await mount()
    const uform = wrapper.find('[data-test="uform"]')
    expect(uform.exists()).toBe(true)
    // presence of labels indicates slot rendered inside stubbed UForm
    expect(wrapper.text()).toContain('connect.page.createAccount.yourNameLabel')
  })
})
