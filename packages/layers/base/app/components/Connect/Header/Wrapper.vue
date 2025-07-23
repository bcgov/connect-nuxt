<template>
  <header
    id="connect-header-wrapper"
    data-testid="connect-header-wrapper"
    class="relative border-b-2 border-brandLight bg-brandDark"
  >
    <nav
      class="app-inner-container px-2"
      :aria-label="$t('connect.header.navLabel')"
    >
      <slot />
    </nav>
  </header>
</template>
