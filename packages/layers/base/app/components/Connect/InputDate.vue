<script setup lang="ts">
// https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/
// https://whatsock.com/Templates/Datepickers/Basic,%20Auto%20Open/index.htm
import type { ConnectInput, UCalendar } from '#components';
import { CalendarDate } from '@internationalized/date'
import { DateTime } from 'luxon'

// FUTURE: update props as needed (min/max/disabled days)
defineProps<{
  label: string
  id: string
}>()

const emit = defineEmits<{
  blur: []
}>()

const externalModel = defineModel<string | null | undefined>({ required: true })

const localModel = computed({
  get() {
    if (externalModel.value) {
      const dt = DateTime.fromISO(externalModel.value, { zone: 'America/Vancouver' })
      if (dt.isValid) {
        return new CalendarDate(dt.year, dt.month, dt.day)
      }
    }
    return undefined
  },
  set(v) {
    if (v) {
      externalModel.value = DateTime.fromObject({
        year: v.year,
        month: v.month,
        day: v.day
      }).toISODate()
    } else {
      externalModel.value = null
    }
  }
})

const open = ref(false)
const calendarRef = useTemplateRef('calendar-ref')
const inputRef = useTemplateRef<InstanceType<typeof ConnectInput>>('input-ref')

function focusCalendar () {
  const button = (calendarRef.value as any).$el.querySelector('button')
  if (button) {
    (button as HTMLButtonElement).focus()
  }
}

function focusInput () {
  const input = (inputRef.value as any).$el.querySelector('input')
  if (input) {
    (input as HTMLInputElement).focus()
  }
  open.value = false
  emit('blur')
}
</script>

<template>
  <UPopover
    v-model:open="open"
    @update:open="(v) => {
      if (!v) {
        $emit('blur')
      }
    }"
    :content="{
      onOpenAutoFocus: (e) => e.preventDefault(),
      onEscapeKeyDown: () => {
        focusInput()
      },
      side: 'bottom',
      align: 'start'
    }"
  >
    <template #default>
      <div class="w-full group">
        <ConnectInput
          ref="input-ref"
          v-model="externalModel"
          :label
          :id
          mask="####-##-##"
          trailing-icon="i-mdi-calendar"
          @focus="open = true"
          @click.stop="open = true"
          @keydown.down.prevent="focusCalendar"
        />
      </div>
    </template>

    <template #content>
      <UCalendar
        ref="calendar-ref"
        v-model="localModel"
        class="p-2"
        @update:model-value="focusInput"
      />
    </template>
  </UPopover>
</template>
