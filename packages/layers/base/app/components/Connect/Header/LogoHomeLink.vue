<script setup lang="ts">
const localePath = useLocalePath()
</script>

<template>
  <NuxtLink
    id="header-logo-home-link"
    :to="localePath('/')"
    :class="[
      'flex items-center gap-4 rounded-md',
      'px-2 transition-colors duration-300',
      'ease-in-out hover:bg-secondary/[0.1]',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary',
    ]"
    :aria-label="$t('connect.header.homeLink')"
  >
    <ConnectBCGovLogo />
    <span class="text-base font-semibold text-secondary lg:text-lg"> {{ $t('connect.header.title') }} </span>
  </NuxtLink>
</template>
