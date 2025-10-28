<script setup lang="ts">
/* eslint-disable vue/no-v-html */
/* eslint-disable vue/no-v-text-v-html-on-component */

const {
  translationPath,
  as = 'span'
} = defineProps<{
  translationPath: string
  as?: 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'label'
    | 'span'
    | 'p'
    | 'div'
    | 'li'
    | 'legend'
    | 'strong'
    | 'em'
}>()

const attrs = useAttrs()
const { t } = useI18n()

const textToDisplay = computed(() => {
  const translationProps = {
    ...attrs,
    boldStart: '<strong>',
    boldEnd: '</strong>',
    italicStart: '<em>',
    italicEnd: '</em>'
  }
  return t(translationPath, translationProps)
})
</script>

<template>
  <component :is="as" v-html="$sanitize(textToDisplay)" />
</template>
