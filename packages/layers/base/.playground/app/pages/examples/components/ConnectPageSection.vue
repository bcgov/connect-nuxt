<script setup lang="ts">
definePageMeta({
  layout: 'connect-base'
})

const actions = ref([
  { label: 'Cancel', variant: 'outline', color: 'success' },
  { label: 'Save Changes', variant: 'solid', color: 'primary', onClick: () => alert('Saved!') }
])
</script>

<template>
  <div class="py-8 space-y-6">
    <h1>
      ConnectPageSection
    </h1>

    <ConnectPageSection :heading="{ label: 'Props' }">
      <div class="p-4">
        <p>This component accepts the following props:</p>
        <ul class="space-y-2">
          <li>
            `heading` (object, optional): Configures the header section.
            <ul>
              <li>`label` (string)</li>
              <li>`labelClass` (string)</li>
              <li>`level` ('h1' to 'h6')</li>
              <li>`icon` (string)</li>
              <li>`iconClass` (string)</li>
              <li>`ui` (string)</li>
            </ul>
          </li>
          <li>`uiBody` (string, optional): Custom classes for the body container.</li>
          <li>`actions` (array, optional): An array of button objects to display in the header.</li>
        </ul>
      </div>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Basic Section' }">
      <div class="p-4">
        <p>
          This is a basic example of the component with a title and some content in the default slot.
        </p>
      </div>
    </ConnectPageSection>

    <ConnectPageSection
      :heading="{
        label: 'Section with Icon & Actions',
        icon: 'i-mdi-cogs'
      }"
      :actions="actions"
    >
      <div class="p-4">
        <p>
          This example includes an icon in the header and a set of action buttons.
        </p>
      </div>
    </ConnectPageSection>

    <ConnectPageSection>
      <template #header>
        <div class="p-4 bg-blue-100 rounded-t-md flex justify-between items-center">
          <span class="font-bold text-blue-800">This is a completely custom header slot.</span>
          <UButton label="Custom Action" size="sm" />
        </div>
      </template>
      <div class="p-4">
        <p>
          The default header is replaced by the content provided in the `header` slot. The `heading` and `actions` props are ignored.
        </p>
      </div>
    </ConnectPageSection>

    <ConnectPageSection
      :heading="{
        label: 'Section with Custom UI',
        ui: 'bg-green-100 p-4 border-b-2 border-green-300'
      }"
      ui-body="p-6 bg-green-50"
    >
      <div class="p-4">
        <p class="text-green-800">
          This example uses the `heading.ui` and `uiBody` props to pass custom Tailwind classes to the underlying UCard component, completely overriding the default styles.
        </p>
      </div>
    </ConnectPageSection>

    <ConnectPageSection>
      <div class="p-4">
        <p>
          This example has no `heading` prop or `header` slot, so the header section is not rendered. The body content is still present.
        </p>
      </div>
    </ConnectPageSection>
  </div>
</template>