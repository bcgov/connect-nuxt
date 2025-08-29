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
    <main class="app-body px-2 sm:px-4">
      <div class="app-inner-container ">
        <slot name="body">
          <div class="grow max-w-full flex flex-col overflow-hidden">
            <slot />
          </div>
        </slot>
      </div>
    </main>
    <slot name="footer">
      <ConnectFooter />
    </slot>
  </div>
</template>
