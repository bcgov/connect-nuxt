<script setup lang="ts">
const {
  stateKey = 'default-button-control'
} = defineProps<{
  stateKey?: string
}>()

const { buttonControl: meta } = useConnectButtonControl(stateKey)
const buttonControl = computed(() => meta.value)
const leftGroup = computed(() => buttonControl.value?.leftGroup || [])
const rightGroup = computed(() => buttonControl.value?.rightGroup || [])
const leftAlertText = computed(() => buttonControl.value?.leftGroup.alertText || undefined)
const rightAlertText = computed(() => buttonControl.value?.rightGroup.alertText || undefined)
</script>

<template>
  <div
    class="@container"
    data-testid="connect-button-control"
  >
    <div class="grid grid-cols-1 gap-4 @4xl:grid-cols-2">
      <div>
        <div
          class="flex justify-center @4xl:justify-start"
          data-testid="left-buttons"
        >
          <div
            class="relative grow flex flex-col flex-wrap gap-4 @4xl:shrink"
            :class="(leftGroup.class || '') + (leftGroup.stacked ? '' : ' flex-row')"
          >
            <div
              v-if="leftAlertText"
              class="absolute flex flex-wrap justify-start bottom-1/3 right-[-13rem] w-[12rem]"
            >
              <p class="text-error" role="alert">
                {{ leftAlertText }}
              </p>
            </div>
            <ConnectButtonControlButtons :buttons="leftGroup.buttons" position="left" />
          </div>
        </div>
      </div>
      <div>
        <div
          class="flex grow justify-center @4xl:justify-end"
          data-testid="right-buttons"
        >
          <div
            class="relative grow flex flex-col flex-wrap gap-4 @4xl:shrink"
            :class="(rightGroup.class || '') + (rightGroup.stacked ? '' : ' flex-row')"
          >
            <div
              v-if="rightAlertText"
              class="absolute flex flex-wrap justify-end bottom-1/3 left-[-13rem] w-[12rem]"
            >
              <p class="text-error" role="alert">
                {{ rightAlertText }}
              </p>
            </div>
            <ConnectButtonControlButtons :buttons="rightGroup.buttons" position="right" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
