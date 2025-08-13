<script setup lang="ts">
const props = defineProps<{
  translationPath: string
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
  return t(props.translationPath, translationProps)
})
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <span v-html="textToDisplay" />
</template>
