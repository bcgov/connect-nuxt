<template>
  <ConnectLayout>
    <template #header>
      <ConnectHeaderAuth />
    </template>

    <template #body>
      <div class="flex flex-col lg:flex-row lg:gap-6 grow">
        <ConnectLayoutPayBody>
          <slot />
        </ConnectLayoutPayBody>
      </div>
    </template>
  </ConnectLayout>
</template>
