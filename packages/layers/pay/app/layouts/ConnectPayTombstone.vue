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
      </ConnectLayoutPayBody>
    </template>
  </ConnectLayout>
</template>
