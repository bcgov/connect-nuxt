<template>
  <header
    id="connect-header-wrapper"
    data-testid="connect-header-wrapper"
    class="relative border-b-2 border-brandLight bg-brandDark p-2 sm:px-4"
  >
    <nav
      class="app-inner-container"
      :aria-label="$t('connect.header.navLabel')"
    >
      <slot />
    </nav>
  </header>
</template>
