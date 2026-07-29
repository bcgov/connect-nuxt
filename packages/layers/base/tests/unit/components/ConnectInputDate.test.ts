import { nextTick } from 'vue'
import { describe, test, expect, vi, afterEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { CalendarDate } from '@internationalized/date'
import ConnectInputDate from '../../../app/components/Connect/Input/Date.vue'

const MockUInput = {
  props: ['id', 'modelValue', 'disabled', 'ariaInvalid'],
  emits: ['update:modelValue'],
  template: `
    <div>
      <input
        :id="id"
        :value="modelValue"
        :disabled="disabled"
        @input="$emit('update:modelValue', $event.target.value)"
      >
      <slot />
      <slot name="trailing" />
    </div>
  `
}

const MockUButton = {
  props: ['disabled', 'ariaLabel', 'icon', 'color', 'variant', 'tabindex', 'ui'],
  emits: ['click'],
  template: `
    <button :disabled="disabled" :aria-label="ariaLabel" @click="$emit('click')">
      <slot />
    </button>
  `
}

const MockUPopover = {
  props: ['open', 'content'],
  emits: ['update:open'],
  template: `
    <div>
      <slot />
      <div data-testid="popover-content">
        <slot name="content" />
      </div>
    </div>
  `
}

const MockUCalendar = {
  props: ['modelValue', 'minValue', 'maxValue'],
  emits: ['update:model-value'],
  template: '<div data-testid="calendar-stub" />'
}

async function mountComponent(modelValue = '') {
  return mountSuspended(ConnectInputDate, {
    props: {
      id: 'basic-date',
      label: 'Date',
      modelValue
    },
    global: {
      stubs: {
        UInput: MockUInput,
        UButton: MockUButton,
        UPopover: MockUPopover,
        UCalendar: MockUCalendar
      },
      mocks: {
        $t: (key: string) => {
          if (key === 'connect.label.selectDate') {
            return 'Select Date'
          }
          if (key === 'connect.label.clear') {
            return 'Clear'
          }
          return key
        }
      }
    }
  })
}

describe('ConnectInputDate Component', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  test('selects a date and emits API format', async () => {
    const wrapper = await mountComponent('')

    await wrapper.findComponent(MockUPopover).vm.$emit('update:open', true)
    await wrapper.findComponent(MockUCalendar).vm.$emit('update:model-value', new CalendarDate(2025, 11, 15))
    await nextTick()

    const input = wrapper.find('input')
    expect((input.element as HTMLInputElement).value).toBe('November 15, 2025')

    const updates = wrapper.emitted('update:modelValue')
    expect(updates).toBeTruthy()
    expect(updates?.at(-1)).toEqual(['2025-11-15'])

    // @ts-expect-error script setup internals are not typed on the wrapper vm
    expect(wrapper.vm.isCalendarOpen).toBe(false)
  })

  test('supports calendar-based selection flow used by keyboard navigation', async () => {
    const wrapper = await mountComponent('')

    await wrapper.findComponent(MockUPopover).vm.$emit('update:open', true)
    await wrapper.findComponent(MockUCalendar).vm.$emit('update:model-value', new CalendarDate(2025, 11, 20))
    await nextTick()

    const input = wrapper.find('input')
    expect((input.element as HTMLInputElement).value).toBe('November 20, 2025')

    const updates = wrapper.emitted('update:modelValue')
    expect(updates?.at(-1)).toEqual(['2025-11-20'])
  })

  test('normalizes typed input and keeps calendar value in sync', async () => {
    const wrapper = await mountComponent('')
    vi.useFakeTimers()

    const input = wrapper.find('input')
    await input.setValue('2022-10-15')

    vi.advanceTimersByTime(500)
    await nextTick()

    expect((input.element as HTMLInputElement).value).toBe('October 15, 2022')

    const updates = wrapper.emitted('update:modelValue')
    expect(updates?.at(-1)).toEqual(['2022-10-15'])

    const calendar = wrapper.findComponent(MockUCalendar)
    const calendarValue = calendar.props('modelValue') as CalendarDate | undefined
    expect(calendarValue?.year).toBe(2022)
    expect(calendarValue?.month).toBe(10)
    expect(calendarValue?.day).toBe(15)
  })
})