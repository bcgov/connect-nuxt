<script setup lang="ts">
const props = defineProps<{
  accountId?: string
}>()

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
    data-testid="connect-breadcrumb-wrapper"
    class="bg-blue-350 p-2 sm:px-4 py-2"
  >
    <nav
      :aria-label="$t('connect.breadcrumb.arialabel')"
      class="app-inner-container flex items-center gap-3"
    >
      <UButton
        class="size-[28px] rounded-full px-1 bg-secondary hover:bg-secondary/75"
        :disabled="breadcrumbs.length < 2"
        color="secondary"
        icon="i-mdi-arrow-left"
        :aria-label="$t('connect.label.goBack')"
        :to="resolveBackHref()"
        :ui="{
          leadingIcon: 'text-primary',
        }"
      />
      <div class="w-[1px] bg-shade h-[24px]" />
      <UBreadcrumb
        as="div"
        aria-label=""
        :items="breadcrumbs"
        separator-icon="i-mdi-chevron-right"
      />
    </nav>
  </div>
</template>
