<template>
  <div class="flex flex-col md:flex-row md:gap-6 grow app-inner-container">
    <div class="grow overflow-hidden">
      <slot />
    </div>

    <div class="shrink-0 md:w-[300px] md:static sticky md:mt-10">
      <div class="sticky md:top-10">
        <ConnectFeeWidget />
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>
