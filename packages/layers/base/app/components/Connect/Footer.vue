<script setup lang="ts">
const uiVersion = useRuntimeConfig().public.version as string
const dependencyVersions: string[] = useAppConfig().connect?.footer?.versions || []
const localePath = useLocalePath()
const links = [
  {
    label: 'connect.label.home',
    to: localePath('/')
  },
  {
    label: 'connect.label.releaseNotes',
    to: 'https://www.release-notes.bcregistry.gov.bc.ca',
    target: '_blank'
  },
  {
    label: 'connect.label.fees',
    to: `${useRuntimeConfig().public.registryHomeURL}product-fees`,
    target: '_blank'
  },
  {
    label: 'connect.label.disclaimer',
    to: 'https://www2.gov.bc.ca/gov/content/home/disclaimer',
    target: '_blank'
  },
  {
    label: 'connect.label.privacy',
    to: 'https://www2.gov.bc.ca/gov/content/home/privacy',
    target: '_blank'
  },
  {
    label: 'connect.label.accessibility',
    to: 'https://www2.gov.bc.ca/gov/content/home/accessibility',
    target: '_blank'
  },
  {
    label: 'connect.label.copyright',
    to: 'https://www2.gov.bc.ca/gov/content/home/copyright',
    target: '_blank'
  }
]

const appVersions = computed<string[]>(() => {
  const items = [...dependencyVersions]
  if (uiVersion) {
    items.unshift(uiVersion)
  }
  return items
})
</script>

<template>
  <footer
    id="connect-main-footer"
    data-testid="connect-main-footer"
    class="border-t-2 border-brandLight bg-brandDark"
  >
    <div class="app-inner-container flex items-center justify-between p-2">
      <nav :aria-label="$t('connect.footer.navLabel')" class="flex grow">
        <ul class="list-none flex-col gap-1 p-0 sm:-ml-2 sm:flex-row sm:flex-wrap">
          <li
            v-for="link in links"
            :key="link.to"
            :class="[
              'flex-col gap-2 border-r-0 pr-2 last:mr-0',
              'last:border-r-0 sm:mr-2 sm:inline-block sm:flex-none',
              'sm:border-r sm:first:ml-2 border-lineLight',
            ]"
          >
            <NuxtLink
              :to="link.to === '/' ? `/${$i18n.locale}` : link.to"
              :target="link.target"
              :class="[
                'rounded p-1 text-sm text-secondary',
                'hover:underline focus:outline-none',
                'focus-visible:ring-2 focus-visible:ring-secondary',
              ]"
            >
              {{ $t(link.label) }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <div class="-mb-1 flex items-center">
        <span class="italic text-brandLight">{{ $t('connect.label.bcApp') }}</span>
        <UTooltip arrow :delay-duration="200">
          <UButton
            :aria-label="$t('connect.label.appVersion')"
            color="secondary"
            icon="i-mdi-info-outline"
            variant="ghost"
          />

          <template #content>
            <div class="flex flex-col">
              <span v-for="(item, i) in appVersions" :key="i">{{ item }}</span>
            </div>
          </template>
        </UTooltip>
      </div>
    </div>
  </footer>
</template>
