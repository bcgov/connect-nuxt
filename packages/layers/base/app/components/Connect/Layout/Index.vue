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
    <slot name="bottomHeaders" />
    <main class="app-body px-2 sm:px-4">
      <slot name="body">
        <div class="app-inner-container grow flex flex-col overflow-clip">
          <slot />
        </div>
      </slot>
    </main>
    <slot name="topFooters" />
    <slot name="footer">
      <ConnectFooter />
    </slot>
  </div>
</template>
