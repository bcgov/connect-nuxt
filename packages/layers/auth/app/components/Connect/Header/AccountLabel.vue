<script setup lang="ts">
defineProps({
  accountName: { default: 'N/A', type: String },
  username: { default: 'N/A', type: String },
  theme: { default: 'header', type: String } // header or dropdown
})
</script>

<template>
  <div class="flex items-center gap-1">
    <UAvatar
      :text="username[0] ? username[0].toLocaleUpperCase($i18n.locale) : 'U'"
      size="md"
      class="text-inverted self-start sm:self-center"
      :ui="{ root: 'bg-blue-300 rounded-none text-lg', fallback: 'text-inverted font-bold' }"
    />
    <div class="mx-2 flex flex-col text-left font-normal tracking-wide">
      <span
        class="text-sm"
        :class="{
          'line-clamp-1 overflow-hidden text-ellipsis text-inverted max-w-64': theme === 'header',
          'text-neutral-highlighted max-w-80': theme === 'dropdown',
        }"
      >
        {{ username }}
      </span>
      <span
        class="line-clamp-1 overflow-hidden text-ellipsis text-xs opacity-75"
        :class="{ 'text-line': theme === 'header', 'text-neutral': theme === 'dropdown' }"
      >
        {{ accountName }}
      </span>
    </div>
  </div>
</template>
