import { describe, test, expect, vi, afterEach } from 'vitest'
import { nextTick } from 'vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import DatePicker from '../../../app/components/Connect/Input/DatePicker.vue'
import DatePickerFormFieldFixture from './fixtures/DatePickerFormFieldFixture.vue'

const MockUInput = {
  template: `
    <div>
      <slot />
      <input
        :id="id"
        :value="modelValue"
        v-bind="$attrs"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
        @keydown="$emit('keydown', $event)"
      >
      <slot name="trailing" />
    </div>
  `,
  props: ['id', 'modelValue', 'disabled', 'class', 'placeholder'],
  emits: ['update:modelValue', 'focus', 'blur', 'keydown']
}

const MockUButton = {
  template: '<button type="button" :data-icon="icon" v-bind="$attrs"><slot /></button>',
  props: ['icon', 'type', 'disabled', 'color', 'variant']
}

const MockUPopover = {
  template: `
    <div>
      <slot />
      <div v-if="open"><slot name="content" /></div>
    </div>
  `,
  props: ['open', 'reference', 'content'],
  emits: ['update:open']
}

const MockUCalendar = {
  template: `
    <button
      type="button"
      data-testid="pick-date"
      @click="$emit('update:modelValue', { year: 2026, month: 7, day: 15 })"
    >pick</button>
  `,
  props: ['modelValue', 'minValue', 'maxValue', 'isDateUnavailable', 'ariaLabel'],
  emits: ['update:modelValue']
}

const stubs = {
  UInput: MockUInput,
  UButton: MockUButton,
  UPopover: MockUPopover,
  UCalendar: MockUCalendar
}

describe('ConnectInputDatePicker Component', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  test('renders the label and initial value from v-model', async () => {
    const wrapper = await mountSuspended(DatePicker, {
      props: { label: 'Test Date', modelValue: '2026-01-01' },
      global: { stubs }
    })

    expect(wrapper.find('label').text()).toBe('Test Date')
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('January 1, 2026')
  })

  test('syncs the model synchronously as the user types, without waiting for the auto-format debounce', async () => {
    const wrapper = await mountSuspended(DatePicker, {
      props: { label: 'Test Date', modelValue: '' },
      global: { stubs }
    })

    await wrapper.find('input').setValue('2026-07-15')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')!.at(-1)).toEqual(['2026-07-15'])
  })

  test(
    'normalizes a recognized format to the display format and converts it to the API format after the debounce',
    async () => {
      const wrapper = await mountSuspended(DatePicker, {
        props: { label: 'Test Date', modelValue: '' },
        global: { stubs }
      })

      vi.useFakeTimers()
      await wrapper.find('input').setValue('1/1/2026')
      await vi.advanceTimersByTimeAsync(500)
      await nextTick()

      expect((wrapper.find('input').element as HTMLInputElement).value).toBe('January 1, 2026')
      expect(wrapper.emitted('update:modelValue')!.at(-1)).toEqual(['2026-01-01'])
    }
  )

  test('sets aria-required on the underlying input when required is true', async () => {
    const wrapper = await mountSuspended(DatePicker, {
      props: { label: 'Test Date', modelValue: '', required: true },
      global: { stubs }
    })

    expect(wrapper.find('input').attributes('aria-required')).toBe('true')
  })

  test('derives aria-describedby from the wrapping form field\'s help text when there is no error', async () => {
    const wrapper = await mountSuspended(DatePickerFormFieldFixture, {
      props: { help: 'Format: Month Day, Year' },
      global: { stubs }
    })

    const describedBy = wrapper.find('input').attributes('aria-describedby')
    expect(describedBy).toMatch(/-help$/)
    expect(wrapper.find(`#${describedBy}`).text()).toBe('Format: Month Day, Year')
    expect(wrapper.find('input').attributes('aria-invalid')).toBe('false')
  })

  test('derives aria-describedby/aria-invalid from the wrapping form field\'s error', async () => {
    const wrapper = await mountSuspended(DatePickerFormFieldFixture, {
      props: { error: 'Please enter a date' },
      global: { stubs }
    })

    const describedBy = wrapper.find('input').attributes('aria-describedby')
    expect(describedBy).toMatch(/-error$/)
    expect(wrapper.find(`#${describedBy}`).text()).toBe('Please enter a date')
    expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
  })

  test('announces a string error via the role=alert region and applies error styling', async () => {
    const wrapper = await mountSuspended(DatePicker, {
      props: { label: 'Test Date', modelValue: '', error: 'This field is required' },
      global: { stubs }
    })

    expect(wrapper.get('[role="alert"]').text()).toBe('This field is required')
    expect(wrapper.get('label').classes()).toContain('text-red-500')
  })

  test('applies error styling without an announcement when error is a boolean', async () => {
    const wrapper = await mountSuspended(DatePicker, {
      props: { label: 'Test Date', modelValue: '', error: true },
      global: { stubs }
    })

    expect(wrapper.get('[role="alert"]').text()).toBe('')
    expect(wrapper.get('label').classes()).toContain('text-red-500')
  })

  test('announces the help text via role=status only while focused and only when there is no error', async () => {
    const wrapper = await mountSuspended(DatePicker, {
      props: { label: 'Test Date', modelValue: '', help: 'Format: Month Day, Year' },
      global: { stubs }
    })

    expect(wrapper.get('[role="status"]').text()).toBe('')

    await wrapper.find('input').trigger('focus')
    expect(wrapper.get('[role="status"]').text()).toBe('Format: Month Day, Year')

    await wrapper.find('input').trigger('blur')
    expect(wrapper.get('[role="status"]').text()).toBe('')

    await wrapper.setProps({ error: 'Please enter a date' })
    await wrapper.find('input').trigger('focus')
    expect(wrapper.get('[role="status"]').text()).toBe('')
  })

  test('clicking the clear button empties the value and notifies the form via a synthetic blur', async () => {
    const wrapper = await mountSuspended(DatePicker, {
      props: { label: 'Test Date', modelValue: '2026-01-01' },
      global: { stubs }
    })

    const inputEl = wrapper.find('input').element as HTMLInputElement
    const blurSpy = vi.fn()
    inputEl.addEventListener('blur', blurSpy)

    await wrapper.find('button[data-icon="i-mdi-close"]').trigger('click')
    await nextTick()

    expect(inputEl.value).toBe('')
    expect(wrapper.emitted('update:modelValue')!.at(-1)).toEqual([''])
    expect(blurSpy).toHaveBeenCalled()
  })

  test('selecting a date from the calendar updates the value, closes the calendar, and notifies the form', async () => {
    const wrapper = await mountSuspended(DatePicker, {
      props: { label: 'Test Date', modelValue: '' },
      global: { stubs }
    })

    const inputEl = wrapper.find('input').element as HTMLInputElement
    const blurSpy = vi.fn()
    inputEl.addEventListener('blur', blurSpy)

    await wrapper.find('input').trigger('focus')
    await nextTick()
    expect(wrapper.find('[data-testid="pick-date"]').exists()).toBe(true)

    await wrapper.find('[data-testid="pick-date"]').trigger('click')
    await nextTick()

    expect(inputEl.value).toBe('July 15, 2026')
    expect(wrapper.emitted('update:modelValue')!.at(-1)).toEqual(['2026-07-15'])
    expect(wrapper.find('[data-testid="pick-date"]').exists()).toBe(false)
    expect(blurSpy).toHaveBeenCalled()
  })
})
