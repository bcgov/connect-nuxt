<script setup lang="ts">
definePageMeta({
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'Connect Floating Label Wrapper' }
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
</script>

<template>
  <div class="flex flex-col gap-10">
    <h1>
      ConnectFloatingLabelWrapper
    </h1>

    <p>Do not forget to associate the label `id` with the inputs `aria-labelledby` attribute for accessibility.</p>

    <ConnectPageSection :heading="{ label: 'Input Example' }" ui-body="p-4 space-y-4">
      <p>Input requires `placeholder="&nbsp;"` attribute.</p>
      <ConnectFloatingLabelWrapper id="input-example" label="Normal">
        <UInput
          v-model="input"
          placeholder="&nbsp;"
          class="w-full"
          aria-labelledby="input-example"
        />
      </ConnectFloatingLabelWrapper>

      <ConnectFloatingLabelWrapper id="input-example-invalid" label="Aria Invalid">
        <UInput
          v-model="input"
          placeholder="&nbsp;"
          aria-invalid="true"
          class="w-full"
          aria-labelledby="input-example-invalid"
        />
      </ConnectFloatingLabelWrapper>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Textarea Example' }" ui-body="p-4 space-y-4">
      <p>Textarea requires `placeholder="&nbsp;"` attribute.</p>
      <ConnectFloatingLabelWrapper
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
      </ConnectFloatingLabelWrapper>

      <ConnectFloatingLabelWrapper
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
      </ConnectFloatingLabelWrapper>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Select Example' }" ui-body="p-4 space-y-4">
      <ConnectFloatingLabelWrapper
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
      </ConnectFloatingLabelWrapper>

      <p>Can't hard code aria-invalid on USelect, will be set by UFormField</p>
      <UFormField error="Some Error">
        <ConnectFloatingLabelWrapper
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
        </ConnectFloatingLabelWrapper>
      </UFormField>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'SelectMenu Example' }" ui-body="p-4 space-y-4">
      <p>SelectMenu requires `data-placeholder="true/false"` attribute.</p>
      <ConnectFloatingLabelWrapper
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
      </ConnectFloatingLabelWrapper>

      <ConnectFloatingLabelWrapper
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
      </ConnectFloatingLabelWrapper>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'InputMenu Example' }" ui-body="p-4 space-y-4">
      <p>InputMenu requires `placeholder="&nbsp;"` attribute.</p>
      <ConnectFloatingLabelWrapper id="inputmenu-example" label="Normal">
        <UInputMenu
          v-model="inputMenu"
          :items="inputMenuItems"
          placeholder="&nbsp;"
          class="w-full"
          aria-labelledby="inputmenu-example"
        />
      </ConnectFloatingLabelWrapper>

      <ConnectFloatingLabelWrapper id="selectmenu-example-invalid" label="Aria Invalid">
        <UInputMenu
          v-model="inputMenu"
          :items="inputMenuItems"
          class="w-full"
          placeholder="&nbsp;"
          aria-invalid="true"
          aria-labelledby="inputmenu-example-invalid"
        />
      </ConnectFloatingLabelWrapper>
    </ConnectPageSection>
  </div>
</template>
