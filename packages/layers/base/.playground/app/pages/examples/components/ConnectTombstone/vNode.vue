<script setup lang="ts">
import { delay } from 'es-toolkit'
import { h } from 'vue'
import type { DropdownMenuItem } from '@nuxt/ui'

definePageMeta({
  layout: 'connect-base'
})

const localePath = useLocalePath()

setBreadcrumbs([
  {
    to: localePath('/'),
    label: 'Examples'
  },
  {
    label: 'ConnectTombstone (vNode)'
  }
])

const tombstone = useConnectTombstone()
const UButton = resolveComponent('UButton')
const UButtonGroup = resolveComponent('UButtonGroup')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UAvatar = resolveComponent('UAvatar')

const dropdownItems = ref<DropdownMenuItem[][]>([
  [
    {
      label: 'Benjamin',
      avatar: {
        src: 'https://github.com/benjamincanac.png',
        size: 'sm'
      },
      type: 'label'
    }
  ],
  [
    {
      label: 'Profile',
      icon: 'i-lucide-user'
    },
    {
      label: 'Billing',
      icon: 'i-lucide-credit-card'
    },
    {
      label: 'Settings',
      icon: 'i-lucide-cog',
      kbds: [',']
    },
    {
      label: 'Keyboard shortcuts',
      icon: 'i-lucide-monitor'
    }
  ],
  [
    {
      label: 'Team',
      icon: 'i-lucide-users'
    },
    {
      label: 'Invite users',
      icon: 'i-lucide-user-plus',
      children: [
        [
          {
            label: 'Email',
            icon: 'i-lucide-mail'
          },
          {
            label: 'Message',
            icon: 'i-lucide-message-square'
          }
        ],
        [
          {
            label: 'More',
            icon: 'i-lucide-circle-plus'
          }
        ]
      ]
    },
    {
      label: 'New team',
      icon: 'i-lucide-plus',
      kbds: ['meta', 'n']
    }
  ],
  [
    {
      label: 'GitHub',
      icon: 'i-simple-icons-github',
      to: 'https://github.com/nuxt/ui',
      target: '_blank'
    },
    {
      label: 'Support',
      icon: 'i-lucide-life-buoy',
      to: '/'
    },
    {
      label: 'API',
      icon: 'i-lucide-cloud',
      disabled: true
    }
  ],
  [
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
      kbds: ['shift', 'meta', 'q']
    }
  ]
])

async function setVNode() {
  tombstone.value.loading = true
  await delay(1500)
  tombstone.value.title = { el: 'span', text: 'VNode Title Here' }
  tombstone.value.subtitles = [{ text: 'BC Cooperative Association' }]
  tombstone.value.details = [
    { text: 'vNode option', icon: { name: 'i-mdi-information-outline' } },
    { vNode: h(UAvatar, { icon: 'i-lucide-image', size: 'md' }) }
  ]
  tombstone.value.sideDetails = [
    { label: 'Business Number', value: '609760293752375' },
    { label: 'Incorporation Number', value: 'BC1234567' },
    { label: 'Email', value: 'email@example.com' },
    { label: 'Phone', value: '250-123-4567' }
  ]
  tombstone.value.bottomButtons = [
    {
      vNode: h('div', { class: 'font-bold text-error' }, 'Render anything using vNode')
    },
    {
      vNode: h(
        'div',
        { },
        [
          h(
            UButtonGroup,
            { size: 'sm' },
            {
              default: () => [
                h(UButton, {
                  variant: 'ghost',
                  label: 'Change',
                  icon: 'i-mdi-pencil',
                  class: 'px-4',
                  onClick: () => window.alert('Change Clicked!')
                }),
                h(UDropdownMenu, {
                  items: dropdownItems.value
                }, {
                  default: () =>
                    h(UButton, {
                      'variant': 'ghost',
                      'icon': 'i-mdi-caret-down',
                      'class': 'px-4 data-[state=open]:bg-(--ui-primary)/25 group',
                      'ui': {
                        leadingIcon: 'shrink-0 group-data-[state=open]:rotate-180 transition-transform duration-200'
                      },
                      'aria-label': 'More Actions'
                    })
                })
              ]
            }
          )
        ]
      )
    }
  ]
  tombstone.value.loading = false
}

onMounted(async () => {
  await setVNode()
})
</script>

<template>
  <div class="py-8 space-y-6">
    <h1>
      ConnectTombstone - vNode
    </h1>

    <p>This component is meant to used with the useConnectTombstone composable.</p>
    <p>Pass any element or component using the vNode option.</p>

    <ConnectPageSection :heading="{ label: 'vNode (with custom id)' }" ui-body="p-4 space-y-4">
      <UButton label="Trigger Refresh" @click="setVNode" />
      <ConnectTombstone id="v-node" class="border border-black" />
    </ConnectPageSection>
  </div>
</template>
