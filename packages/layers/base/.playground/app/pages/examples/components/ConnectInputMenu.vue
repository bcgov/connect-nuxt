<script setup lang="ts">
definePageMeta({
  breadcrumbs: [
    { label: 'Examples', to: '/' },
    { label: 'Connect Input Menu' }
  ]
})
const normalMenu = ref('')
const normalMenuItems = ref(['Backlog', 'Todo', 'In Progress', 'Done'])
const multipleMenu = ref([])
const multipleMenuItems = ref(['Backlog', 'Todo', 'In Progress', 'Done'])
const objectMenu = ref<object | null>(null)
const objectMenuItems = ref([
  {
    label: 'Backlog',
    id: 'backlog'
  },
  {
    label: 'Todo',
    id: 'todo'
  },
  {
    label: 'In Progress',
    id: 'in_progress'
  },
  {
    label: 'Done',
    id: 'done'
  }
])
</script>

<template>
  <div class="flex flex-col gap-10">
    <h1>
      ConnectInputMenu
    </h1>

    <ConnectPageSection :heading="{ label: 'Default Example' }" ui-body="p-4 space-y-4">
      <ConnectInputMenu
        id="normal-example"
        v-model="normalMenu"
        label="Normal"
        :items="normalMenuItems"
        class="w-full"
      />
      <pre>Model Value: {{ normalMenu }}</pre>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Multiple Example' }" ui-body="p-4 space-y-4">
      <ConnectInputMenu
        id="multiple-example"
        v-model="multipleMenu"
        label="Multiple"
        :items="multipleMenuItems"
        class="w-full"
        multiple
      />
      <pre>Model Value: {{ multipleMenu }}</pre>
    </ConnectPageSection>

    <ConnectPageSection :heading="{ label: 'Object Example' }" ui-body="p-4 space-y-4">
      <ConnectInputMenu
        id="object-example"
        v-model="objectMenu"
        label="Object"
        :items="objectMenuItems"
        class="w-full"
        value-key="id"
      />
      <pre>Model Value: {{ objectMenu }}</pre>
    </ConnectPageSection>
  </div>
</template>
