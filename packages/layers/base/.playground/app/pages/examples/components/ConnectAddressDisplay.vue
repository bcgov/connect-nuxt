<script setup lang="ts">
definePageMeta({
  layout: 'connect-base'
})
</script>

<template>
  <div class="py-8 space-y-6">
    <h1>
      ConnectAddressDisplay
    </h1>

    <ConnectPageSection :heading="{ label: 'Props' }" ui-body="p-4 space-y-4">
      <ul>
        <li>`address` - ConnectAddress - required</li>
        <li>`omitCountry` - boolean - optional</li>
        <li>`mask` - string - optional</li>
        <li>`invalid` - boolean - optional</li>
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
          // streetName?: string
          // streetNumber?: string
          // unitNumber?: string
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
          // streetName?: string
          // streetNumber?: string
          // unitNumber?: string
        }"
        :omit-country="true"
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
