<script setup lang="ts">
definePageMeta({
  layout: 'connect-sidebar',
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'Connect Floating Label' }
  ]
})
const input = ref('')
const textarea = ref('')
const select = ref('')
const selectItems = ref(['Backlog', 'Todo', 'In Progress', 'Done'])
const selectMenu = ref('')
const selectMenuItems = ref(['Backlog', 'Todo', 'In Progress', 'Done'])
const inputMenu = ref('')
const inputMenuItems = ref(['Backlog', 'Todo', 'In Progress', 'Done'])

onMounted(initSidebar)
</script>

<template>
  <div class="flex flex-col gap-10">
    <h1>
      ConnectFloatingLabel
    </h1>

    <p>Do not forget to associate the label `id` with the inputs `aria-labelledby` attribute for accessibility.</p>

    <ConnectPageSection :heading="{ label: 'Input Example' }" ui-body="p-4 space-y-4">
      <p>Input requires `placeholder="&nbsp;"` attribute.</p>
      <ConnectFloatingLabel id="input-example" label="Normal">
        <UInput
          v-model="input"
          placeholder="&nbsp;"
          class="w-full"
          aria-labelledby="input-example"
        />
      </ConnectFloatingLabel>

      <ConnectFloatingLabel id="input-example-invalid" label="Aria Invalid">
        <UInput
          v-model="input"
          placeholder="&nbsp;"
          aria-invalid="true"
          class="w-full"
          aria-labelledby="input-example-invalid"
        />
      </ConnectFloatingLabel>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Textarea Example' }" ui-body="p-4 space-y-4">
      <p>Textarea requires `placeholder="&nbsp;"` attribute.</p>
      <ConnectFloatingLabel
        id="textarea-example"
        label="Normal"
        variant="textarea"
      >
        <UTextarea
          v-model="textarea"
          placeholder="&nbsp;"
          class="w-full"
          aria-labelledby="textarea-example"
        />
      </ConnectFloatingLabel>

      <ConnectFloatingLabel
        id="textarea-example-invalid"
        label="Aria Invalid"
        variant="textarea"
      >
        <UTextarea
          v-model="textarea"
          placeholder="&nbsp;"
          aria-invalid="true"
          class="w-full"
          aria-labelledby="textarea-example-invalid"
        />
      </ConnectFloatingLabel>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Select Example' }" ui-body="p-4 space-y-4">
      <ConnectFloatingLabel
        id="select-example"
        label="Normal"
        variant="select"
      >
        <USelect
          v-model="select"
          :items="selectItems"
          class="w-full"
          aria-labelledby="select-example"
        />
      </ConnectFloatingLabel>

      <p>Can't hard code aria-invalid on USelect, will be set by UFormField</p>
      <UFormField error="Some Error">
        <ConnectFloatingLabel
          id="select-example-invalid"
          label="Aria Invalid"
          variant="select"
        >
          <USelect
            v-model="select"
            :items="selectItems"
            class="w-full"
            aria-labelledby="select-example-invalid"
          />
        </ConnectFloatingLabel>
      </UFormField>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'SelectMenu Example' }" ui-body="p-4 space-y-4">
      <p>SelectMenu requires `data-placeholder="true/false"` attribute.</p>
      <ConnectFloatingLabel
        id="selectmenu-example"
        label="Normal"
        variant="selectmenu"
      >
        <USelectMenu
          v-model="selectMenu"
          :items="selectMenuItems"
          class="w-full"
          :data-placeholder="!selectMenu"
          aria-labelledby="selectmenu-example"
        />
      </ConnectFloatingLabel>

      <ConnectFloatingLabel
        id="selectmenu-example-invalid"
        label="Aria Invalid"
        variant="selectmenu"
      >
        <USelectMenu
          v-model="selectMenu"
          :items="selectMenuItems"
          class="w-full"
          aria-invalid="true"
          :data-placeholder="!selectMenu"
          aria-labelledby="selectmenu-example-invalid"
        />
      </ConnectFloatingLabel>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'InputMenu Example' }" ui-body="p-4 space-y-4">
      <p>InputMenu requires `placeholder="&nbsp;"` attribute.</p>
      <ConnectFloatingLabel id="inputmenu-example" label="Normal">
        <UInputMenu
          v-model="inputMenu"
          :items="inputMenuItems"
          placeholder="&nbsp;"
          class="w-full"
          aria-labelledby="inputmenu-example"
        />
      </ConnectFloatingLabel>

      <ConnectFloatingLabel id="selectmenu-example-invalid" label="Aria Invalid">
        <UInputMenu
          v-model="inputMenu"
          :items="inputMenuItems"
          class="w-full"
          placeholder="&nbsp;"
          aria-invalid="true"
          aria-labelledby="inputmenu-example-invalid"
        />
      </ConnectFloatingLabel>
    </ConnectPageSection>
  </div>
</template>
