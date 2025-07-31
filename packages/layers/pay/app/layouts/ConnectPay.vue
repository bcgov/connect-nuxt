<template>
  <ConnectLayout>
    <template #body>
      <div class="grow max-w-full overflow-hidden">
        <slot />
      </div>

      <div class="shrink-0 lg:w-[300px] lg:static sticky lg:mt-10">
        <ConnectFeeWidget class="sticky lg:top-10" />
      </div>
    </template>
  </ConnectLayout>
</template>
