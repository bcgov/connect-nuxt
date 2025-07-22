<script setup lang="ts">
// must explicitly import or will fail when publishing layer // TODO: find better way to handle image aliases
// @ts-ignore - Cannot find module 'BCGovLogoLgFr' or its corresponding type declarations.ts(2307)
import frLargeLogo from 'BCGovLogoLgFr'
// @ts-ignore
import frSmallLogo from 'BCGovLogoSmFr'
// @ts-ignore
import enLargeLogo from 'BCGovLogoLgEn'
// @ts-ignore
import enSmallLogo from 'BCGovLogoSmEn'
</script>
<template>
  <!-- use french logo for french locale, any other locale uses english logo -->
  <div v-if="$i18n.locale === 'fr-CA'" class="shrink-0">
    <!-- Using scale because it will increase the size of the image without affecting the container size -->
    <!-- there is a lot of padding on the images, if only the height gets increased, the padding makes the header too tall -->
    <img
      class="hidden h-[60px] scale-125 sm:block"
      :src="frLargeLogo"
      :alt="$t('ConnectBCGovLogo.alt')"
    >
    <img
      class="block h-[64px] scale-125 sm:hidden"
      :src="frSmallLogo"
      :alt="$t('ConnectBCGovLogo.alt')"
    >
  </div>
  <div v-else class="shrink-0">
    <img
      class="hidden h-[60px] scale-125 sm:block"
      :src="enLargeLogo"
      :alt="$t('ConnectBCGovLogo.alt')"
    >
    <img
      class="block h-[64px] scale-150 sm:hidden"
      :src="enSmallLogo"
      :alt="$t('ConnectBCGovLogo.alt')"
    >
  </div>
</template>
