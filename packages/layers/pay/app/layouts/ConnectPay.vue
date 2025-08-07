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
  </ConnectLayout>
</template>
