<script setup lang="ts">
const { $sanitize } = useNuxtApp()

defineProps<{
  items: ConnectWhatsNewItem[]
}>()
</script>
<template>
  <USlideover
    :title="$t('connect.label.whatsNewSlideover')"
    :description="$t('connect.text.whatsNewSlideoverDescription')"
    :overlay="false"
    :close="{
      color: 'neutral',
      variant: 'ghost',
      class: 'cursor-pointer hover:bg-gray-100/50 focus-visible:bg-transparent focus-visible:ring-2 rounded-full'
    }"
    :ui="{
      header: 'bg-brandLight',
      title: 'text-brandDark',
      body: 'flex-1 overflow-y-auto p-0 sm:p-0',
      description: 'sr-only'
    }"
  >
    <template #body>
      <div class="overflow-y-auto text-neutral">
        <div class="flex-1">
          <ol v-if="items.length">
            <li
              v-for="item, i in items"
              :key="i"
              class="flex flex-col border-b border-gray-500 p-4 last:border-0"
            >
              <h3 class="text-lg font-bold">
                {{ item.title }}
              </h3>
              <time class="text-sm">{{ item.date }}</time>
              <!-- eslint-disable vue/no-v-html -->
              <div
                class="pt-3 vhtml"
                v-html="$sanitize(item.description)"
              />
            </li>
          </ol>
          <div v-else class="flex justify-center py-10">
            <span>{{ $t('connect.text.whatsNewSlideoverEmpty') }}</span>
          </div>
        </div>
      </div>
    </template>
  </USlideover>
</template>
<!-- must style globally for vhtml style to work  -->
<style>
.vhtml a {
  color: var(--ui-markBlue);
  text-decoration: underline;
}
</style>