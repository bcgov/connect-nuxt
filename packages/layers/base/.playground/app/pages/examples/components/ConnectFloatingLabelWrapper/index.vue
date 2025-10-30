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
</script>

<template>
  <div class="flex flex-col gap-10">
    <h1>
      ConnectFloatingLabelWrapper
    </h1>

    <ConnectPageSection :heading="{ label: 'Input Example' }" ui-body="p-4 space-y-4">
      <p>Input requires `placeholder="&nbsp;"` attribute.</p>
      <ConnectFloatingLabelWrapper label="Normal">
        <UInput
          v-model="input"
          placeholder="&nbsp;"
          class="w-full"
        />
      </ConnectFloatingLabelWrapper>

      <ConnectFloatingLabelWrapper label="Aria Invalid">
        <UInput
          v-model="input"
          placeholder="&nbsp;"
          aria-invalid="true"
          class="w-full"
        />
      </ConnectFloatingLabelWrapper>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Textarea Example' }" ui-body="p-4 space-y-4">
      <p>Textarea requires `placeholder="&nbsp;"` attribute.</p>
      <ConnectFloatingLabelWrapper label="Normal" variant="textarea">
        <UTextarea
          v-model="textarea"
          placeholder="&nbsp;"
          class="w-full"
        />
      </ConnectFloatingLabelWrapper>

      <ConnectFloatingLabelWrapper label="Aria Invalid" variant="textarea">
        <UTextarea
          v-model="textarea"
          placeholder="&nbsp;"
          aria-invalid="true"
          class="w-full"
        />
      </ConnectFloatingLabelWrapper>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Select Example' }" ui-body="p-4 space-y-4">
      <ConnectFloatingLabelWrapper label="Normal" variant="select">
        <USelect
          v-model="select"
          :items="selectItems"
          class="w-full"
        />
      </ConnectFloatingLabelWrapper>

      <p>Can't hard code aria-invalid on USelect, will be set by UFormField</p>
      <UFormField error="Some Error">
        <ConnectFloatingLabelWrapper label="Aria Invalid" variant="select">
          <USelect
            v-model="select"
            :items="selectItems"
            class="w-full"
          />
        </ConnectFloatingLabelWrapper>
      </UFormField>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'SelectMenu Example' }" ui-body="p-4 space-y-4">
      <ConnectFloatingLabelWrapper label="Normal" variant="select">
        <USelectMenu
          v-model="select"
          :items="selectItems"
          class="w-full"
        />
      </ConnectFloatingLabelWrapper>

      <p>Can't hard code aria-invalid on USelect, will be set by UFormField</p>
      <UFormField error="Some Error">
        <ConnectFloatingLabelWrapper label="Aria Invalid" variant="select">
          <USelectMenu
            v-model="select"
            :items="selectItems"
            class="w-full"
          />
        </ConnectFloatingLabelWrapper>
      </UFormField>
    </ConnectPageSection>
  </div>
</template>
