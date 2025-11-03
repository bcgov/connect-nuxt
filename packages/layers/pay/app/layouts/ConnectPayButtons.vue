<template>
  <ConnectLayout>
    <template #header>
      <ConnectHeaderAuth />
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
