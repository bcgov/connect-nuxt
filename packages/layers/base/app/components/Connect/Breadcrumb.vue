<script setup lang="ts">
const props = defineProps({ accountId: { type: String, required: false } })

const { t } = useI18n()

const breadcrumbs = computed<ConnectBreadcrumb[]>(() => {
  const metaCrumbs = useRoute().meta.breadcrumbs as ConnectBreadcrumb[] | undefined

  if (metaCrumbs) {
    return metaCrumbs.map((bc) => {
      if (bc.appendAccountId && props.accountId) {
        return {
          ...bc,
          to: appendUrlParam(bc.to as string, 'accountid', props.accountId)
        }
      }
      return bc
    })
  } else {
    return [{ label: t('connect.breadcrumb.default') }]
  }
})

function resolveBackHref() {
  const bcLength = breadcrumbs.value.length

  if (bcLength > 1) {
    // return the second to last breadcrumb link
    return breadcrumbs.value[bcLength - 2]?.to ?? breadcrumbs.value[bcLength - 2]?.href
  } else {
    return ''
  }
}
</script>

<template>
  <div
    v-if="$route.meta.hideBreadcrumbs !== true"
    class="bg-blue-350"
  >
    <div class="app-inner-container flex items-center p-2 sm:px-4 py-2 gap-3">
      <UButton
        class="size-[28px] rounded-full px-1 bg-secondary hover:bg-secondary/75"
        :disabled="breadcrumbs.length < 2"
        color="secondary"
        icon="i-mdi-arrow-left"
        :aria-label="$t('connect.label.goBack')"
        :to="resolveBackHref()"
        :ui="{
          leadingIcon: 'text-blue-500',
        }"
      />
      <div class="w-[1px] bg-shade h-[24px]" />
      <UBreadcrumb
        :items="breadcrumbs"
        :aria-label="$t('connect.breadcrumb.arialabel')"
        separator-icon="i-mdi-chevron-right"
      />
    </div>
  </div>
</template>
