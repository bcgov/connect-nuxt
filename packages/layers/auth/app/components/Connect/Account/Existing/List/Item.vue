<script setup lang="ts">
defineProps<{
  account: ConnectAccount
}>()

defineEmits<{
  select: [id: number]
}>()
</script>

<template>
  <li class="flex flex-col items-start justify-between gap-4 py-8 first:pt-0 last:pb-0 sm:flex-row sm:items-center">
    <div
      class="flex flex-row items-center gap-4 sm:gap-6"
      :class="{
        'opacity-50': account.accountStatus !== AccountStatus.ACTIVE,
      }"
    >
      <UAvatar
        :alt="account.label[0]"
        :ui="{
          root: 'bg-blue-300 rounded-sm',
          fallback: 'text-white font-bold text-xl',
        }"
      />
      <div class="flex w-full flex-col text-left">
        <span class="text-lg font-bold text-neutral-highlighted">
          {{ account.label }}
        </span>
      </div>
    </div>
    <div class="flex w-full flex-col gap-4 sm:w-fit sm:flex-row">
      <div class="my-auto flex gap-2">
        <UBadge
          v-if="account.accountStatus !== AccountStatus.ACTIVE"
          :label="$t('badge.inactiveAccount')"
          class="bg-[#fff7e3] px-3 text-center font-bold text-neutral"
        />
      </div>

      <UButton
        :label="$t('connect.label.useThisAccount')"
        :aria-label="$t('connect.label.useThisAccountAria', { name: account.label })"
        :icon="'i-mdi-chevron-right'"
        trailing
        :disabled="account.accountStatus !== AccountStatus.ACTIVE"
        size="xl"
        data-testid="choose-existing-account-button"
        class="w-full justify-center sm:w-min sm:justify-normal"
        @click="$emit('select', account.id)"
      />
    </div>
  </li>
</template>
