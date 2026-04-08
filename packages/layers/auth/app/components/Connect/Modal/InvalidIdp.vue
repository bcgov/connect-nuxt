<script setup lang="ts">
defineProps<{
  currentIdp: ConnectLoginSource
  redirectUrl: string
}>()

const { t, locale } = useI18n()

const formattedIdps = computed(() => {
  const allowedIdps = useAppConfig().connect.login.idps
  const labels = allowedIdps.map(idp => t(`connect.label.${idp}`))

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat#using_format
  const formatter = new Intl.ListFormat(locale.value, {
    style: 'long',
    type: 'disjunction'
  })

  return formatter.format(labels)
})
</script>

<template>
  <UModal
    id="invalid-idp-dialog"
    overlay
    :dismissible="false"
  >
    <template #content>
      <div class="p-10 flex flex-col gap-6">
        <div role="alert">
          <h2
            id="invalid-idp-title"
            class="text-xl font-bold text-neutral-highlighted"
          >
            {{ $t('connect.invalidIdp.title', { idp: currentIdp }) }}
          </h2>
        </div>
        <div>
          <div role="alert">
            <span>{{ $t('connect.invalidIdp.content', { allowedIdps: formattedIdps }) }}</span>
          </div>
        </div>
        <div class="flex flex-wrap items-center justify-center gap-4">
          <UButton
            :label="$t('connect.label.logout')"
            size="xl"
            class="font-bold"
            @click="useConnectAuth().logout(redirectUrl)"
          />
        </div>
      </div>
    </template>
  </UModal>
</template>
