<script setup lang="ts">
type VariantOption = 'input' | 'textarea' | 'select' | 'selectmenu'

const {
  variant = 'input'
} = defineProps<{
  label: string
  variant?: VariantOption
  id: string
}>()

const variantClass: Record<VariantOption, string[]> = {
  input: [
    '-translate-y-1/2 top-1/2 group-focus-within:top-3 delay-50',
    'group-has-[div>input:not(:placeholder-shown)]:top-3',
    'group-has-[div>input:not(:placeholder-shown)]:text-xs',
    'group-has-[div>input[aria-invalid=true]]:text-error'
  ],
  textarea: [
    'top-1 group-focus-within:top-1 delay-50',
    'group-has-[div>textarea:not(:placeholder-shown)]:top-1',
    'group-has-[div>textarea:not(:placeholder-shown)]:text-xs',
    'group-has-[div>textarea[aria-invalid=true]]:text-error'
  ],
  select: [
    'delay-100',
    '-translate-y-1/2 top-1/2 group-focus-within:top-3',
    'group-has-[button[aria-invalid=true]]:text-error',
    'group-has-[button[data-state=open]]:top-3',
    'group-has-[button[data-state=open]]:text-xs',
    'group-has-[button:not([data-placeholder])]:top-3',
    'group-has-[button:not([data-placeholder])]:text-xs',
    'group-has-[button[data-state=open]:not([aria-invalid=true])]:text-primary'
  ],
  selectmenu: [
    'delay-100',
    '-translate-y-1/2 top-1/2 group-focus-within:top-3',
    'group-has-[button[aria-invalid=true]]:text-error',
    'group-has-[button[data-state=open]]:top-3',
    'group-has-[button[data-state=open]]:text-xs',
    'group-has-[button[data-placeholder=false]]:top-3',
    'group-has-[button[data-placeholder=false]]:text-xs',
    'group-has-[button[data-state=open]:not([aria-invalid=true])]:text-primary'
  ]
}
</script>

<template>
  <div class="relative group">
    <span
      :id
      :class="[
        variantClass[variant],
        'line-clamp-1 px-2.5',
        'absolute z-10 group-focus-within:text-primary',
        'pointer-events-none text-neutral transition-all',
        'motion-reduce:transition-none duration-200',
        'group-focus-within:text-xs',
        'group-focus-within:text-primary',
        'w-fit',
      ]"
    >
      {{ label }}
    </span>
    <slot />
  </div>
</template>
