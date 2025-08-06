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
    <main class="app-inner-container app-body">
      <slot name="body">
        <div class="grow max-w-full overflow-hidden">
          <slot />
        </div>
      </slot>
    </main>
    <slot name="footer">
      <ConnectFooter />
    </slot>
  </div>
</template>
