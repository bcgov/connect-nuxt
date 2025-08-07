<script setup lang="ts">
const buttonControl = computed(() => useRoute().meta.buttonControl as ConnectButtonControl)
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
    <div class="grid grid-cols-1 gap-4 @3xl:grid-cols-2">
      <div>
        <div
          class="flex flex-col justify-center items-center gap-4 @3xl:justify-start"
          :class="leftGroup.stacked ? '' : '@3xs:flex-row'"
          data-testid="left-buttons"
        >
          <ConnectButtonControlButtons :buttons="leftGroup.buttons" :position="'left'" />
          <p
            v-if="leftAlertText"
            class="text-error"
            role="alert"
          >
            {{ leftAlertText }}
          </p>
        </div>
      </div>
      <div>
        <div
          class="flex flex-col justify-center items-center gap-4 @3xl:justify-end"
          :class="rightGroup.stacked ? '' : '@3xs:flex-row'"
          data-testid="right-buttons"
        >
          <p
            v-if="rightAlertText"
            class="text-error"
            role="alert"
          >
            {{ rightAlertText }}
          </p>
          <ConnectButtonControlButtons :buttons="rightGroup.buttons" :position="'right'" />
        </div>
      </div>
    </div>
  </div>
</template>
