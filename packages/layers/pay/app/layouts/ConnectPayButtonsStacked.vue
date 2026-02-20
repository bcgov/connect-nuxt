<template>
  <ConnectLayout>
    <template #header>
      <ConnectHeaderAuth />
    </template>
    <template #body>
      <ConnectLayoutPayBody>
        <slot />
        <template #actions>
          <ConnectButtonControl class="mt-4" />
        </template>
      </ConnectLayoutPayBody>
    </template>
  </ConnectLayout>
</template>
