<script setup lang="ts">
const buttonControl = computed(() => useRoute().meta.buttonControl as ConnectButtonControl)
const leftButtons = computed(() => buttonControl.value?.leftButtons || [])
const rightButtons = computed(() => buttonControl.value?.rightButtons || [])
const leftAlertText = computed(() => buttonControl.value?.leftAlertText || undefined)
const rightAlertText = computed(() => buttonControl.value?.rightAlertText || undefined)
</script>

<template>
  <div
    class="@container"
    data-testid="connect-button-control"
  >
    <div class="grid grid-cols-1 gap-4 @3xl:grid-cols-2">
      <div>
        <div
          class="flex flex-col justify-center items-center gap-4 @3xl:justify-start @2xs:flex-row"
          data-testid="left-buttons"
        >
          <ConnectButtonControlButtons :buttons="leftButtons" :position="'left'" />
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
          class="flex flex-col justify-center items-center gap-4 @3xl:justify-end @2xs:flex-row"
          data-testid="right-buttons"
        >
          <p
            v-if="rightAlertText"
            class="text-error"
            role="alert"
          >
            {{ rightAlertText }}
          </p>
          <ConnectButtonControlButtons :buttons="rightButtons" :position="'right'" />
        </div>
      </div>
    </div>
  </div>
</template>
