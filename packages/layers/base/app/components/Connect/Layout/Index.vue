<template>
  <div class="app-container">
    <slot name="header">
      <ConnectHeader />
    </slot>
    <slot name="banner">
      <ConnectSystemBanner />
    </slot>
    <slot name="breadcrumb">
      <ConnectBreadcrumb />
    </slot>
    <div class="app-inner-container app-body">
      <div class="flex flex-col lg:flex-row lg:gap-6 grow">
        <div class="grow max-w-full overflow-hidden">
          <slot />
        </div>
      </div>
    </div>
    <slot name="footer">
      <ConnectFooter />
    </slot>
  </div>
</template>
