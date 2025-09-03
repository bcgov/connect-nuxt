<script setup lang="ts">
import type { ConnectContactItem } from '#imports';

const props = defineProps<{
  contact: ConnectContactItem | ConnectContactItem[]
  hours?: string
}>()

const iconMap = {
  email: 'i-mdi-email',
  phone: 'i-mdi-phone',
  fax: 'i-mdi-fax'
}

const isMultipleContacts = computed(() => Array.isArray(props.contact))
const normalizedContact = computed(() => {
  return isMultipleContacts.value ? props.contact as ConnectContactItem[] : [props.contact as ConnectContactItem]
})
</script>

<template>
  <div class="space-y-5">
    <ul v-if="isMultipleContacts" class="space-y-1" :aria-label="$t('connect.label.contactInformation')">
      <li v-for="item in normalizedContact" :key="item.value">
        <span class="inline-flex items-center gap-1">
          <UIcon :name="iconMap[item.type]" class="mr-2 size-4 text-blue-350" />
          {{ item.title }}
          <span v-if="item.type === 'fax'">{{ item.value }}</span>
          <a
            v-else
            class="text-primary underline"
            :href="item.href"
            :target="item.type === 'email' ? '_blank' : undefined"
          >
            {{ item.value }}
          </a>
        </span>
      </li>
    </ul>

    <div v-else-if="normalizedContact[0]">
      <span class="inline-flex items-center gap-1">
        <UIcon :name="iconMap[normalizedContact[0].type]" class="mr-2 size-4 text-blue-350" />
        {{ normalizedContact[0].title }}
        <a
          class="text-primary underline"
          :href="normalizedContact[0].href"
          :target="normalizedContact[0].type === 'email' ? '_blank' : undefined"
        >
          {{ normalizedContact[0].value }}
        </a>
      </span>
    </div>

    <p v-if="hours">
      <strong class="text-neutral-highlighted">{{ $t('connect.label.hoursOfOperation') }}</strong>
      <br>
      {{ hours }}
    </p>
  </div>
</template>
