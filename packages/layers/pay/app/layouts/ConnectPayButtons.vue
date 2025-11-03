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
      <ConnectButtonControlWrapper class="px-2 sm:px-4" />
    </template>
  </ConnectLayout>
</template>
