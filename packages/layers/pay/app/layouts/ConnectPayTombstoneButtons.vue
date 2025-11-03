<template>
  <ConnectLayout>
    <template #header>
      <ConnectHeaderAuth />
    </template>
    <template #bottomHeaders>
      <ConnectTombstone state-key="connect-pay-header-tombstone" />
    </template>
    <template #body>
      <ConnectLayoutPayBody>
        <slot />
      </ConnectLayoutPayBody>
    </template>
    <template #topFooters>
      <ConnectButtonControlWrapper state-key="connect-pay-buttons" class="px-2 sm:px-4" />
    </template>
  </ConnectLayout>
</template>
