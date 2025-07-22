<script setup lang="ts">
const localePath = useLocalePath()
</script>
<template>
  <NuxtLink
    id="header-logo-home-link"
    :to="localePath('/')"
    class="flex items-center gap-4 rounded-md px-2 transition-colors duration-300 ease-in-out hover:bg-white/[0.1] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
    :aria-label="$t('ConnectHeader.homeLink')"
  >
    <ConnectBCGovLogo />
    <span class="text-base font-semibold text-white lg:text-lg"> {{ $t('ConnectHeader.title') }} </span>
  </NuxtLink>
</template>
