<script setup lang="ts">
definePageMeta({
  layout: 'connect-base',
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'ConnectFieldset' }
  ]
})
</script>

<template>
  <div class="my-10 space-y-8">
    <div class="space-y-4">
      <h1>
        ConnectFieldset
      </h1>
    </div>

    <ConnectPageSection :heading="{ label: 'Props' }" ui-body="sm:p-6 space-y-4">
      <ul>
        <li>`label` - string - required</li>
        <li>`error` - FormError - optional</li>
        <li>`showErrorMsg` - boolean - optional</li>
        <li>`orientation` - 'vertical' | 'horizontal' - default: vertical</li>
      </ul>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'ConnectFieldset (default)' }" ui-body="sm:p-6 space-y-4">
      <ConnectFieldset label="Fieldset Label">
        <div class="border border-black p-10">
          Slot Content
        </div>
      </ConnectFieldset>
    </ConnectPageSection>
    
    <ConnectPageSection :heading="{ label: 'ConnectFieldset (with error)' }" ui-body="sm:p-6 space-y-4">
      <ConnectFieldset label="Fieldset Label" :error="{ name: 'some-formfield', message: 'Error' }">
        <div class="border border-black p-10">
          Slot Content
        </div>
      </ConnectFieldset>
    </ConnectPageSection>
    
    <ConnectPageSection :heading="{ label: 'ConnectFieldset (display error message)' }" ui-body="sm:p-6 space-y-4">
      <ConnectFieldset label="Fieldset Label" :error="{ name: 'some-formfield', message: 'Field Required' }" :show-error-msg="true">
        <div class="border border-black p-10">
          Slot Content
        </div>
      </ConnectFieldset>
    </ConnectPageSection>
    
    <ConnectPageSection :heading="{ label: 'ConnectFieldset (horizontal)' }" ui-body="sm:p-6 space-y-4">
      <p>When horizontal, the label takes up 1/4 of the space.</p>
      <ConnectFieldset label="Fieldset Label" orientation="horizontal">
        <div class="border border-black p-10">
          Slot Content
        </div>
      </ConnectFieldset>
    </ConnectPageSection>
    
    <ConnectPageSection :heading="{ label: 'ConnectFieldset (horizontal and error)' }" ui-body="sm:p-6 space-y-4">
      <ConnectFieldset label="Fieldset Label" :error="{ name: 'some-formfield', message: 'Field Required' }" :show-error-msg="true" orientation="horizontal">
        <div class="border border-black p-10">
          Slot Content
        </div>
      </ConnectFieldset>
    </ConnectPageSection>
  </div>
</template>
