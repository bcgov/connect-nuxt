<template>
  <ConnectLayout>
    <template #header>
      <!-- Exposes the header slot of the base layout -->
      <slot name="header">
        <ConnectHeader />
      </slot>
    </template>
    <template #body>
      <!-- Exposes the body slot of the base layout -->
      <slot name="body">
        <div class="grow max-w-full overflow-hidden">
          <slot />
        </div>
      </slot>
    </template>
    <template #topFooters>
      <ConnectButtonControlWrapper />
    </template>
  </ConnectLayout>
</template>
