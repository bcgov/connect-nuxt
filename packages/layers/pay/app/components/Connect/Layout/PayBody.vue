<template>
  <div class="flex flex-col lg:flex-row lg:gap-6 grow app-inner-container">
    <div class="grow overflow-hidden">
      <slot />
    </div>

    <div class="shrink-0 lg:w-[300px] lg:static sticky lg:mt-10">
      <div class="sticky lg:top-10">
        <ConnectFeeWidget />
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>
