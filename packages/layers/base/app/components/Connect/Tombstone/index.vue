<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'

const props = defineProps<{ stateKey: string }>()

const { tombstone } = useConnectTombstone(props.stateKey)

async function handleButtonAction (button: ButtonProps, event: MouseEvent) {
  button.loading = true
  if (button.onClick) {
    if (Array.isArray(button.onClick)) {
      await Promise.all(button.onClick.map(fn => fn(event)))
    } else if (button.onClick) {
      await button.onClick(event)
    }
  }
  button.loading = false
}
</script>

<template>
  <div class="bg-white py-8 px-2 sm:px-4">
    <div class="app-inner-container">
      <div
        v-if="tombstone.loading"
        class="flex flex-col gap-2 *:space-y-2 sm:flex-row"
      >
        <slot name="loading">
          <div class="grow">
            <USkeleton class="h-9 w-[400px] rounded" />
            <USkeleton class="h-5 w-[250px] rounded" />
            <USkeleton class="h-5 w-[200px] rounded" />
            <USkeleton class="h-5 w-[150px] rounded" />
          </div>
          <div>
            <USkeleton class="h-5 w-[300px] rounded" />
            <USkeleton class="h-5 w-[300px] rounded" />
            <USkeleton class="h-5 w-[300px] rounded" />
            <USkeleton class="h-5 w-[300px] rounded" />
          </div>
        </slot>
      </div>
      <div
        v-else
        class="flex flex-col gap-2 sm:flex-row"
      >
        <div class="grow space-y-4">
          <div>
            <slot name="title">
              <component
                :is="tombstone.title.as"
                class="text-[1.375rem] font-bold text-neutral-highlighted"
              >
                {{ tombstone.title.text }}
              </component>
            </slot>
            <slot name="subtitles">
              <div
                v-if="tombstone.subtitles.length"
                class="flex divide-x divide-gray-500"
              >
                <ConnectTombstoneItem
                  v-for="subtitle, i in tombstone.subtitles"
                  :key="'subtitle-' + i"
                  v-bind="subtitle"
                  class="px-2"
                  :class="i === 0 ? 'pl-0' : ''"
                />
              </div>
            </slot>
          </div>
          <div class="space-y-1">
            <slot name="details">
              <div class="flex space-x-2">
                <div
                  v-for="detail, i in tombstone.details"
                  :key="'detail-' + i"
                >
                  <ConnectTombstoneItem v-bind="detail" />
                </div>
              </div>
            </slot>
            <slot name="buttons">
              <div
                v-if="tombstone.bottomButtons.length"
                class="flex flex-wrap gap-2"
              >
                <template v-for="btn in tombstone.bottomButtons" :key="btn.button?.label || btn.vNode?.key">
                  <component :is="btn.vNode" v-if="btn.vNode" />
                  <UButton
                    v-else-if="btn.button"
                    v-bind="{
                      ...btn.button,
                      onClick(event) {
                        handleButtonAction(btn.button!, event)
                      },
                    }"
                  />
                </template>
              </div>
            </slot>
          </div>
        </div>
        <slot name="sideDetails">
          <dl class="space-y-1 text-sm">
            <div
              v-for="detail in tombstone.sideDetails"
              :key="detail.label"
              class="flex flex-row flex-wrap gap-2"
            >
              <dt class="font-bold text-neutral-highlighted">
                {{ detail.label }}:
              </dt>
              <dd>
                {{ detail.value }}
              </dd>
            </div>
          </dl>
        </slot>
      </div>
    </div>
  </div>
</template>
