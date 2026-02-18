<template>
  <ConnectLayout>
    <template #header>
      <ConnectHeaderAuth />
    </template>
    <template #bottomHeaders>
      <ConnectTombstone />
    </template>
    <template #body>
      <ConnectLayoutPayBody>
        <slot />
        <template #actions>
          <!-- expose actions -->
          <slot name="actions">
            <ConnectButtonControl class="mt-4" />
          </slot>
        </template>
      </ConnectLayoutPayBody>
    </template>
  </ConnectLayout>
</template>
