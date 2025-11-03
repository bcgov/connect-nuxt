<template>
  <ConnectLayout>
    <template #header>
      <ConnectHeaderAuth />
    </template>
    <template #body>
      <ConnectLayoutPayBody>
        <slot />
        <template #actions>
          <ConnectButtonControl />
        </template>
      </ConnectLayoutPayBody>
    </template>
  </ConnectLayout>
</template>
