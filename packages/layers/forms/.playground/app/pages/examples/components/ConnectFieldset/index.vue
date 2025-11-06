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
      <p>Use the fieldset component to group related form inputs (e.g., Addresses).</p>
    </div>

    <ConnectPageSection :heading="{ label: 'Props' }" ui-body="sm:p-6 space-y-4">
      <ul>
        <li>`label` - string - required</li>
        <li>`string` - string - optional</li>
        <li>`error` - FormError - optional</li>
        <li>`showErrorMsg` - boolean - optional</li>
        <li>`orientation` - 'vertical' | 'horizontal' - default: vertical</li>
        <li>`bodyVariant` - 'card' | 'none' - default: none</li>
      </ul>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Slots' }" ui-body="sm:p-6 space-y-4">
      <ul>
        <li>label</li>
        <li>description</li>
        <li>default</li>
      </ul>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'ConnectFieldset (default)' }" ui-body="sm:p-6 space-y-4">
      <ConnectFieldset label="Fieldset Label">
        <div class="border border-black p-10">
          Slot Content
        </div>
      </ConnectFieldset>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'ConnectFieldset (with description)' }" ui-body="sm:p-6 space-y-4">
      <ConnectFieldset
        label="Fieldset Label"
        description="A fieldset description"
      >
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
      <ConnectFieldset
        label="Fieldset Label"
        :error="{ name: 'some-formfield', message: 'Field Required' }"
        :show-error-msg="true"
      >
        <div class="border border-black p-10">
          Slot Content
        </div>
      </ConnectFieldset>
    </ConnectPageSection>

    <ConnectPageSection
      :heading="{ label: 'ConnectFieldset (display error message and description)' }"
      ui-body="sm:p-6 space-y-4"
    >
      <ConnectFieldset
        label="Fieldset Label"
        description="A fieldset description"
        :error="{ name: 'some-formfield', message: 'Field Required' }"
        :show-error-msg="true"
      >
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

    <ConnectPageSection :heading="{ label: 'ConnectFieldset (horizontal with decription)' }" ui-body="sm:p-6 space-y-4">
      <p>When horizontal, the label takes up 1/4 of the space.</p>
      <ConnectFieldset
        label="Fieldset Label"
        description="A fieldset description"
        orientation="horizontal"
      >
        <div class="border border-black p-10">
          Slot Content
        </div>
      </ConnectFieldset>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'ConnectFieldset (horizontal and error)' }" ui-body="sm:p-6 space-y-4">
      <ConnectFieldset
        label="Fieldset Label"
        :error="{ name: 'some-formfield', message: 'Field Required' }"
        :show-error-msg="true"
        orientation="horizontal"
      >
        <div class="border border-black p-10">
          Slot Content
        </div>
      </ConnectFieldset>
    </ConnectPageSection>

    <ConnectPageSection
      :heading="{ label: 'ConnectFieldset (horizontal, error text and description)' }"
      ui-body="sm:p-6 space-y-4"
    >
      <ConnectFieldset
        label="Fieldset Label"
        description="A fieldset description"
        :error="{ name: 'some-formfield', message: 'Field Required' }"
        :show-error-msg="true"
        orientation="horizontal"
      >
        <div class="border border-black p-10">
          Slot Content
        </div>
      </ConnectFieldset>
    </ConnectPageSection>

    <ConnectPageSection
      :heading="{ label: 'ConnectFieldset (label slot)' }"
      ui-body="sm:p-6 space-y-4"
    >
      <ConnectFieldset>
        <template #label>
          <div class="flex gap-4 items-center">
            <UIcon name="i-mdi-account-plus" class="text-primary shrink-0 size-6" />
            <span>Custom Label Slot</span>
          </div>
        </template>
        <template #default>
          <div class="border border-black p-10">
            Slot Content
          </div>
        </template>
      </ConnectFieldset>
    </ConnectPageSection>

    <ConnectPageSection
      :heading="{ label: 'ConnectFieldset (description slot)' }"
      ui-body="sm:p-6 space-y-4"
    >
      <ConnectFieldset label="Fieldset with Custom Description Slot">
        <template #description>
          <div class="flex gap-4 items-center">
            <UIcon name="i-mdi-cog" class="text-primary shrink-0 size-6" />
            <span>Custom description slot content</span>
          </div>
        </template>
        <template #default>
          <div class="border border-black p-10">
            Slot Content
          </div>
        </template>
      </ConnectFieldset>
    </ConnectPageSection>

    <ConnectPageSection
      :heading="{ label: 'ConnectFieldset (description slot horizontal)' }"
      ui-body="sm:p-6 space-y-4"
    >
      <ConnectFieldset label="Fieldset with Custom Description Slot" orientation="horizontal">
        <template #description>
          <div class="flex gap-4 items-center">
            <UIcon name="i-mdi-cog" class="text-primary shrink-0 size-6" />
            <span>Custom description slot content</span>
          </div>
        </template>
        <template #default>
          <div class="border border-black p-10">
            Slot Content
          </div>
        </template>
      </ConnectFieldset>
    </ConnectPageSection>

    <ConnectPageSection
      class="bg-transparent border-4 border-shade-secondary"
      :heading="{ label: 'ConnectFieldset (bodyVariant = card)' }"
      ui-body="sm:p-6 space-y-4"
    >
      <ConnectFieldset label="Fieldset Label" body-variant="card">
        <div class="border border-black p-10">
          Slot Content
        </div>
      </ConnectFieldset>
    </ConnectPageSection>
  </div>
</template>
