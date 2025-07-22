<template>
  <header
    id="connect-header-wrapper"
    data-testid="connect-header-wrapper"
    class="relative border-b-2 border-connect-yellow bg-connect-darkBlue p-2 sm:px-4 dark:border-b dark:bg-connect-darkGray"
  >
    <nav
      class="app-inner-container px-2"
      :aria-label="$t('ConnectHeader.navLabel')"
    >
      <slot />
    </nav>
  </header>
</template>
