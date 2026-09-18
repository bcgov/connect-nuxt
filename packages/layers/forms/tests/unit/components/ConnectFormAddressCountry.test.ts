/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeAll } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { ConnectFormAddressCountry } from '#components'

// jsdom doesn't implement scrollIntoView, which UInputMenu's underlying
// reka-ui listbox calls when highlighting an item as the search term changes.
Element.prototype.scrollIntoView = vi.fn()

describe('CountrySelect.vue', () => {
  const mountComponent = (props = {}) => {
    return mountSuspended(ConnectFormAddressCountry, {
      props: {
        modelValue: '',
        parentId: 'test',
        schemaPrefix: 'test',
        ...props
      }
    })
  }

  it('correctly sorts options to show CA and US first', async () => {
    const wrapper = await mountComponent()
    const options = (wrapper.vm as any).options
    expect(options[0].alpha_2).toBe('CA')
    expect(options[1].alpha_2).toBe('US')
  })

  it('does not duplicate CA and US further down the list', async () => {
    const wrapper = await mountComponent()
    const options = (wrapper.vm as any).options
    expect(options.filter((o: any) => o.alpha_2 === 'CA')).toHaveLength(1)
    expect(options.filter((o: any) => o.alpha_2 === 'US')).toHaveLength(1)
  })

  it('passes the disabled prop down to the underlying input', async () => {
    const wrapper = await mountComponent({ disabled: true })
    const input = wrapper.find('[data-testid="test-input-country"]')
    expect(input.attributes('disabled')).toBeDefined()
  })

  it('applies correct ARIA attributes to the underlying input', async () => {
    const wrapper = await mountComponent()
    const inputEl = wrapper.find('[data-testid="test-input-country"]')
    expect(inputEl.exists()).toBe(true)
    expect(inputEl.attributes('aria-labelledby')).toBe('test-input-country-label')
  })

  it('displays the label for the selected country, not its raw value', async () => {
    const wrapper = await mountComponent({ modelValue: 'CA' })
    const input = wrapper.find('[data-testid="test-input-country"]')
    expect((input.element as HTMLInputElement).value).toBe('Canada')
  })

  it('excludes the previously selected country once it no longer matches the search term', async () => {
    const wrapper = await mountComponent({ modelValue: 'CA' })
    const input = wrapper.find('[data-testid="test-input-country"]')
    await input.setValue('united')

    const filteredItems = (wrapper.vm as any).filteredItems
    expect(filteredItems.some((item: any) => item.alpha_2 === 'CA')).toBe(false)
  })

  it('still matches once a second word is typed', async () => {
    const wrapper = await mountComponent()
    const input = wrapper.find('[data-testid="test-input-country"]')
    await input.setValue('united s')

    const filteredItems = (wrapper.vm as any).filteredItems
    expect(filteredItems.some((item: any) => item.alpha_2 === 'US')).toBe(true)
  })

  it('selects the country on enter when the search narrows to a single match', async () => {
    const wrapper = await mountSuspended(ConnectFormAddressCountry, {
      props: { modelValue: '', parentId: 'test', schemaPrefix: 'test' },
      attachTo: document.body
    })
    const input = wrapper.find('[data-testid="test-input-country"]')
    await input.trigger('focus')
    await input.setValue('Canada')
    await wrapper.vm.$nextTick()

    await input.trigger('keydown', { key: 'Enter' })
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 150))
    await wrapper.vm.$nextTick()

    expect((wrapper.vm as any).model).toBe('CA')
    expect((input.element as HTMLInputElement).value).toBe('Canada')
  })
})

describe('matchesWordStart', () => {
  let matchesWordStart: (text: string, search: string) => boolean

  beforeAll(async () => {
    const wrapper = await mountSuspended(ConnectFormAddressCountry, {
      props: { modelValue: '', parentId: 'test', schemaPrefix: 'test' }
    })
    matchesWordStart = (wrapper.vm as any).matchesWordStart
  })

  it('matches when the search term is a prefix of the first word', () => {
    expect(matchesWordStart('Review Pending', 're')).toBe(true)
  })

  it('matches when the search term is a prefix of a later word', () => {
    expect(matchesWordStart('Pending Review', 're')).toBe(true)
  })

  it('does not match when the search term only appears mid-word', () => {
    expect(matchesWordStart('Expired', 're')).toBe(false)
  })

  it('is case-insensitive', () => {
    expect(matchesWordStart('United States', 'UNITED')).toBe(true)
  })

  it('treats punctuation as a word boundary', () => {
    expect(matchesWordStart('Korea, Republic of', 'rep')).toBe(true)
  })

  it('returns true for an empty or blank search term', () => {
    expect(matchesWordStart('Canada', '')).toBe(true)
    expect(matchesWordStart('Canada', '   ')).toBe(true)
  })

  it('matches a multi-word search spanning from the first word into the next', () => {
    expect(matchesWordStart('United States', 'united s')).toBe(true)
  })

  it('does not match a multi-word search that is not a contiguous substring', () => {
    // 'uni' and 'sta' each prefix a word, but 'uni sta' doesn't appear as
    // contiguous text in 'United States' ('ted' sits between them).
    expect(matchesWordStart('United States', 'uni sta')).toBe(false)
  })

  it('does not match when the search text does not appear at all', () => {
    expect(matchesWordStart('United States', 'united x')).toBe(false)
  })
})
