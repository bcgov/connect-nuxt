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
        <li>`error` - FormError - optional</li>
        <li>`showErrorMsg` - boolean - optional</li>
        <li>`orientation` - 'vertical' | 'horizontal' - default: vertical</li>
      </ul>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'ConnectFormFieldWrapper (default)' }" ui-body="sm:p-6 space-y-4">
      <ConnectFormFieldWrapper label="Wrapper Label">
        <div class="border border-black p-10">
          Slot Content
        </div>
      </ConnectFormFieldWrapper>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'ConnectFormFieldWrapper (with error)' }" ui-body="sm:p-6 space-y-4">
      <ConnectFormFieldWrapper label="Wrapper Label" :error="{ name: 'some-formfield', message: 'Error' }">
        <div class="border border-black p-10">
          Slot Content
        </div>
      </ConnectFormFieldWrapper>
    </ConnectPageSection>

    <ConnectPageSection
      :heading="{ label: 'ConnectFormFieldWrapper (display error message)' }"
      ui-body="sm:p-6 space-y-4"
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

    <ConnectPageSection :heading="{ label: 'ConnectFormFieldWrapper (horizontal)' }" ui-body="sm:p-6 space-y-4">
      <p>When horizontal, the label takes up 1/4 of the space.</p>
      <ConnectFormFieldWrapper label="Wrapper Label" orientation="horizontal">
        <div class="border border-black p-10">
          Slot Content
        </div>
      </ConnectFormFieldWrapper>
    </ConnectPageSection>

    <ConnectPageSection
      :heading="{ label: 'ConnectFormFieldWrapper (horizontal and error)' }"
      ui-body="sm:p-6 space-y-4"
    >
      <ConnectFormFieldWrapper
        label="Wrapper Label"
        :error="{ name: 'some-formfield', message: 'Field Required' }"
        :show-error-msg="true"
        orientation="horizontal"
      >
        <div class="border border-black p-10">
          Slot Content
        </div>
      </ConnectFormFieldWrapper>
    </ConnectPageSection>
  </div>
</template>
