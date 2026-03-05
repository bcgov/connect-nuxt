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
        <li>`description` - string - optional</li>
        <li>`error` - FormError | boolean - optional</li>
        <li>`showErrorMsg` - boolean - optional</li>
        <li>`orientation` - 'vertical' | 'horizontal' - default: horizontal</li>
        <li>`bodyVariant` - 'card' | 'none' - default: none</li>
        <li>`paddingClass` - 'x-default' | 'xy-default' | string - default: 'x-default'</li>
      </ul>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Slots' }" ui-body="sm:p-6 space-y-4">
      <ul>
        <li>label</li>
        <li>description</li>
        <li>default</li>
      </ul>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'ConnectFieldset (default)' }" ui-body="space-y-4">
      <ConnectFieldset label="Fieldset Label">
        <div class="border border-black p-10">
          Slot Content
        </div>
      </ConnectFieldset>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'ConnectFieldset (with description)' }" ui-body="space-y-4">
      <ConnectFieldset
        label="Fieldset Label"
        description="A fieldset description"
      >
        <div class="border border-black p-10">
          Slot Content
        </div>
      </ConnectFieldset>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'ConnectFieldset (with error)' }" ui-body="space-y-4">
      <ConnectFieldset label="Fieldset Label" :error="{ name: 'some-formfield', message: 'Error' }">
        <div class="border border-black p-10">
          Slot Content
        </div>
      </ConnectFieldset>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'ConnectFieldset (display error message)' }" ui-body="space-y-4">
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
      ui-body="space-y-4"
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

    <ConnectPageSection :heading="{ label: 'ConnectFieldset (vertical)' }" ui-body="space-y-4">
      <ConnectFieldset label="Fieldset Label" orientation="vertical">
        <div class="border border-black p-10">
          Slot Content
        </div>
      </ConnectFieldset>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'ConnectFieldset (vertical with decription)' }" ui-body="space-y-4">
      <ConnectFieldset
        label="Fieldset Label"
        description="A fieldset description"
        orientation="vertical"
      >
        <div class="border border-black p-10">
          Slot Content
        </div>
      </ConnectFieldset>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'ConnectFieldset (vertical and error)' }" ui-body="space-y-4">
      <ConnectFieldset
        label="Fieldset Label"
        :error="{ name: 'some-formfield', message: 'Field Required' }"
        :show-error-msg="true"
        orientation="vertical"
      >
        <div class="border border-black p-10">
          Slot Content
        </div>
      </ConnectFieldset>
    </ConnectPageSection>

    <ConnectPageSection
      :heading="{ label: 'ConnectFieldset (vertical, error text and description)' }"
      ui-body="space-y-4"
    >
      <ConnectFieldset
        label="Fieldset Label"
        description="A fieldset description"
        :error="{ name: 'some-formfield', message: 'Field Required' }"
        :show-error-msg="true"
        orientation="vertical"
      >
        <div class="border border-black p-10">
          Slot Content
        </div>
      </ConnectFieldset>
    </ConnectPageSection>

    <ConnectPageSection
      :heading="{ label: 'ConnectFieldset (label slot)' }"
      ui-body="space-y-4"
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
      ui-body="space-y-4"
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
      ui-body="space-y-4"
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
      ui-body="space-y-4"
    >
      <ConnectFieldset label="Fieldset Label" body-variant="card">
        <div class="border border-black p-10">
          Slot Content
        </div>
      </ConnectFieldset>
    </ConnectPageSection>

    <ConnectPageSection
      class="bg-transparent border-4 border-shade-secondary"
      :heading="{ label: 'ConnectFieldset (bodyVariant = card), vertical' }"
      ui-body="space-y-4"
    >
      <ConnectFieldset
        label="Fieldset Label"
        body-variant="card"
        orientation="vertical"
      >
        <div class="border border-black p-10">
          Slot Content
        </div>
      </ConnectFieldset>
    </ConnectPageSection>

    <ConnectPageSection
      class="bg-transparent border-4 border-shade-secondary"
      :heading="{ label: 'ConnectFieldset (bodyVariant = card), vertical, error, description' }"
      ui-body="space-y-4"
    >
      <ConnectFieldset
        label="Fieldset Label"
        body-variant="card"
        orientation="vertical"
        :error="{ message: 'Field Required' }"
        description="Some fancy description text"
        :show-error-msg="true"
      >
        <div class="border border-black p-10">
          Slot Content
        </div>
      </ConnectFieldset>
    </ConnectPageSection>

    <ConnectPageSection
      class="bg-transparent border-4 border-shade-secondary"
      :heading="{ label: 'ConnectFieldset (custom padding)' }"
      ui-body="space-y-4"
    >
      <ConnectFieldset
        label="Fieldset Label"
        padding-class="px-10 py-6"
      >
        <div class="border border-black p-10">
          Slot Content
        </div>
      </ConnectFieldset>
    </ConnectPageSection>
  </div>
</template>
