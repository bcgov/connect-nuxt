<script setup lang="ts">
const props = defineProps<{
  currentIdp: ConnectLoginSource
}>()
const emit = defineEmits<{ close: [] }>()

function closeModal() {
  emit('close')
}
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
            {{ $t('connect.invalidIdp.title') }} {{ props.currentIdp }}
          </h2>
        </div>
        <div>
          <div role="alert">
            <span>{{ $t('connect.invalidIdp.content') }}</span>
          </div>
        </div>
        <div class="flex flex-wrap items-center justify-center gap-4">
          <UButton
            :label="$t('connect.label.logout')"
            :aria-label="$t('connect.label.logout')"
            size="xl"
            class="font-bold"
            @click="closeModal"
          />
        </div>
      </div>
    </template>
  </UModal>
</template>
