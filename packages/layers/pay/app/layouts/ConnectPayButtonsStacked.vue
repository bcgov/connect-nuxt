<template>
  <ConnectLayout>
    <template #header>
      <ConnectHeaderAuth />
    </template>
    <template #body>
      <ConnectLayoutPayBody>
        <slot />
        <template #actions>
          <ConnectButtonControl state-key="connect-pay-buttons" />
        </template>
      </ConnectLayoutPayBody>
    </template>
  </ConnectLayout>
</template>
