<template>
  <div class="app-container">
    <ConnectHeader />
    <ConnectBreadcrumb />
    <div class="app-inner-container app-body">
      <div class="flex flex-col lg:flex-row lg:gap-6 grow">
        <div class="grow max-w-full overflow-hidden">
          <slot />
        </div>
      </div>
    </div>
    <ConnectFooter />
  </div>
</template>
