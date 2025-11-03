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
        <template #actions>
          <!-- expose actions -->
          <slot name="actions">
            <ConnectButtonControl state-key="connect-pay-buttons" />
          </slot>
        </template>
      </ConnectLayoutPayBody>
    </template>
  </ConnectLayout>
</template>
