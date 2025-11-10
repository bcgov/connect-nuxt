<script setup lang="ts">
definePageMeta({
  layout: 'connect-sidebar',
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'Connect Address Display' }
  ]
})
</script>

<template>
  <div class="flex flex-col gap-10">
    <h1>
      ConnectAddressDisplay
    </h1>

    <ConnectPageSection :heading="{ label: 'Props' }" ui-body="p-4 space-y-4">
      <ul>
        <li>`address` - ConnectAddress - required</li>
        <li>`omitCountry` - boolean - optional</li>
        <li>`separateCity` - boolean - optional</li>
        <li>`textDecor` - boolean - optional</li>
      </ul>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Standard State' }" ui-body="p-4 space-y-4">
      <ConnectAddressDisplay
        :address="{
          street: '123 Street Ave',
          streetAdditional: 'Line 2',
          city: 'Townsville',
          region: 'XY',
          postalCode: 'V1X 1X1',
          country: 'CA',
          locationDescription: 'Some extra location info',
        }"
      />
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Omit Country' }" ui-body="p-4 space-y-4">
      <ConnectAddressDisplay
        :address="{
          street: '123 Street Ave',
          streetAdditional: 'Line 2',
          city: 'Townsville',
          region: 'XY',
          postalCode: 'V1X 1X1',
          country: 'CA',
          locationDescription: 'Some extra location info',
        }"
        :omit-country="true"
      />
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Separate City' }" ui-body="p-4 space-y-4">
      <ConnectAddressDisplay
        :address="{
          street: '123 Street Ave',
          streetAdditional: 'Line 2',
          city: 'Townsville',
          region: 'XY',
          postalCode: 'V1X 1X1',
          country: 'CA',
          locationDescription: 'Some extra location info',
        }"
        :separate-city="true"
      />
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Text Decor' }" ui-body="p-4 space-y-4">
      <ConnectAddressDisplay
        :address="{
          street: '123 Street Ave',
          streetAdditional: 'Line 2',
          city: 'Townsville',
          region: 'XY',
          postalCode: 'V1X 1X1',
          country: 'Canada',
          locationDescription: 'Some extra location info',
        }"
        :text-decor="true"
      />
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Separated Street Name, Number and Unit Number' }" ui-body="p-4 space-y-4">
      <ConnectAddressDisplay
        :address="{
          // street: '123 Street Ave',
          streetAdditional: 'Line 2',
          city: 'Townsville',
          region: 'XY',
          postalCode: 'V1X 1X1',
          country: 'CA',
          locationDescription: 'Some extra location info',
          streetName: 'Street Ave',
          streetNumber: '123',
          unitNumber: '101',
        }"
      />
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Partial Fields' }" ui-body="p-4 space-y-4">
      <ConnectAddressDisplay
        :address="{
          street: '123 Street Ave',
          city: 'Townsville',
          region: 'XY',
          country: 'CA',
        }"
      />
    </ConnectPageSection>
  </div>
</template>
