export const getBaseSidebarItems = () => {
  const localePath = useLocalePath()

  return [
    [
      {
        label: 'Components',
        type: 'label'
      },
      {
        label: 'Connect Button Control',
        children: [
          {
            label: 'Default',
            to: localePath('/examples/components/ConnectButtonControl/Default')
          },
          {
            label: 'Options',
            to: localePath('/examples/components/ConnectButtonControl/Options')
          },
          {
            label: 'Stacked',
            to: localePath('/examples/components/ConnectButtonControl/Stacked')
          }
        ]
      },
      {
        label: 'Connect Floating Label',
        children: [
          {
            label: 'Default',
            to: localePath('/examples/components/ConnectFloatingLabel')
          }
        ]
      },
      {
        label: 'Connect Modal',
        children: [
          {
            label: 'Default',
            to: localePath('/examples/components/ConnectModal')
          },
          {
            label: 'Error',
            to: localePath('/examples/components/ConnectModal/Error')
          }
        ]
      },
      {
        label: 'Connect Tombstone',
        children: [
          {
            label: 'Basic',
            to: localePath('/examples/components/ConnectTombstone/basic')
          },
          {
            label: 'Full Options',
            to: localePath('/examples/components/ConnectTombstone/full-options')
          },
          {
            label: 'Multiple',
            to: localePath('/examples/components/ConnectTombstone/multiple')
          },
          {
            label: 'vNode',
            to: localePath('/examples/components/ConnectTombstone/vNode')
          },
          {
            label: 'Reset',
            to: localePath('/examples/components/ConnectTombstone/reset')
          },
          {
            label: 'Slots',
            to: localePath('/examples/components/ConnectTombstone/slots')
          },
          {
            label: 'Initial State',
            to: localePath('/examples/components/ConnectTombstone/initial-state')
          }
        ]
      },
      {
        label: 'Connect Address Display',
        to: localePath('/examples/components/ConnectAddressDisplay')
      },
      {
        label: 'Connect Breadcrumb',
        to: localePath('/examples/components/ConnectBreadcrumb')
      },
      {
        label: 'Connect Contact Display',
        to: localePath('/examples/components/ConnectContactDisplay')
      },
      {
        label: 'Connect Header',
        to: localePath('/examples/components/ConnectHeader')
      },
      {
        label: 'Connect Footer',
        to: localePath('/examples/components/ConnectFooter')
      },
      {
        label: 'Connect I18n Helper',
        to: localePath('/examples/components/ConnectI18nHelper')
      },
      {
        label: 'Connect Input',
        to: localePath('/examples/components/ConnectInput')
      },
      {
        label: 'Connect InputDate',
        to: localePath('/examples/components/ConnectInputDate')
      },
      {
        label: 'Connect Locale Select',
        to: localePath('/examples/components/ConnectLocaleSelect')
      },
      {
        label: 'Connect Page Section',
        to: localePath('/examples/components/ConnectPageSection')
      },
      {
        label: 'Connect Spinner',
        to: localePath('/examples/components/ConnectSpinner')
      },
      {
        label: 'Connect Textarea',
        to: localePath('/examples/components/ConnectTextarea')
      },
      {
        label: 'Layouts',
        type: 'label'
      },
      {
        label: 'Connect Base',
        to: localePath('/examples/layouts/connect-base')
      },
      {
        label: 'Error Pages',
        type: 'label'
      },
      {
        label: '404',
        to: localePath('/examples/error-page/404')
      },
      {
        label: '500',
        to: localePath('/examples/error-page/500')
      },
      {
        label: 'Other',
        type: 'label'
      },
      {
        label: 'LaunchDarkly',
        to: localePath('/examples/launchdarkly')
      }
    ]
  ]
}
