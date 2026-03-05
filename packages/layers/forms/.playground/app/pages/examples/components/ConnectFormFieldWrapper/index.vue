<script setup lang="ts">
definePageMeta({
  layout: 'connect-base',
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'ConnectFormFieldWrapper' }
  ]
})
</script>

<template>
  <div class="my-10 space-y-8">
    <div class="space-y-4">
      <h1>
        ConnectFormFieldWrapper
      </h1>
      <p>Use the wrapper component to wrap UFormField components.</p>
      <p>
        <span class="font-bold text-black">Important: </span>This component is meant to wrap single inputs only,
        if grouping related inputs (e.g., Addresses), please use the ConnectFieldset component.
      </p>
      <p>
        <span class="font-bold text-black">Important: </span>This component is purely presentational/structural
        please provide meaningful labels to the child elements.
      </p>
    </div>

    <ConnectPageSection :heading="{ label: 'Props' }" ui-body="sm:p-6 space-y-4">
      <ul>
        <li>`label` - string - required</li>
        <li>`error` - FormError | boolean - optional</li>
        <li>`showErrorMsg` - boolean - optional</li>
        <li>`orientation` - 'vertical' | 'horizontal' - default: horizontal</li>
        <li>`paddingClass` - 'x-default' | 'xy-default' | string - default: 'x-default'</li>
      </ul>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'ConnectFormFieldWrapper (default)' }" ui-body="space-y-4">
      <ConnectFormFieldWrapper label="Wrapper Label">
        <div class="border border-black p-10">
          Slot Content
        </div>
      </ConnectFormFieldWrapper>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'ConnectFormFieldWrapper (with error)' }" ui-body="space-y-4">
      <ConnectFormFieldWrapper label="Wrapper Label" :error="{ name: 'some-formfield', message: 'Error' }">
        <div class="border border-black p-10">
          Slot Content
        </div>
      </ConnectFormFieldWrapper>
    </ConnectPageSection>

    <ConnectPageSection
      :heading="{ label: 'ConnectFormFieldWrapper (display error message)' }"
      ui-body="space-y-4"
    >
      <ConnectFormFieldWrapper
        label="Wrapper Label"
        :error="{ name: 'some-formfield', message: 'Field Required' }"
        :show-error-msg="true"
      >
        <div class="border border-black p-10">
          Slot Content
        </div>
      </ConnectFormFieldWrapper>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'ConnectFormFieldWrapper (vertical)' }" ui-body="space-y-4">
      <ConnectFormFieldWrapper label="Wrapper Label" orientation="vertical">
        <div class="border border-black p-10">
          Slot Content
        </div>
      </ConnectFormFieldWrapper>
    </ConnectPageSection>

    <ConnectPageSection
      :heading="{ label: 'ConnectFormFieldWrapper (vertical and error)' }"
      ui-body="space-y-4"
    >
      <ConnectFormFieldWrapper
        label="Wrapper Label"
        :error="{ name: 'some-formfield', message: 'Field Required' }"
        :show-error-msg="true"
        orientation="vertical"
      >
        <div class="border border-black p-10">
          Slot Content
        </div>
      </ConnectFormFieldWrapper>
    </ConnectPageSection>

    <ConnectPageSection
      :heading="{ label: 'ConnectFormFieldWrapper (custom padding)' }"
      ui-body="space-y-4"
    >
      <ConnectFormFieldWrapper
        label="Wrapper Label"
        padding-class="px-10 py-6"
      >
        <div class="border border-black p-10">
          Slot Content
        </div>
      </ConnectFormFieldWrapper>
    </ConnectPageSection>
  </div>
</template>
