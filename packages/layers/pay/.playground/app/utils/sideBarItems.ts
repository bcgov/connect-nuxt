export const getBaseSidebarItems = () => {
  const localePath = useLocalePath()
  return [
    [
      {
        label: 'Components',
        type: 'label'
      },
      {
        label: 'Connect Fee Widget',
        children: [
          {
            label: 'Default',
            to: localePath('/examples/components/ConnectFeeWidget/default')
          },
          {
            label: 'Extra Fees',
            to: localePath('/examples/components/ConnectFeeWidget/extraFees')
          },
          {
            label: 'Loading',
            to: localePath('/examples/components/ConnectFeeWidget/loading')
          },
          {
            label: 'Multiple Fees',
            to: localePath('/examples/components/ConnectFeeWidget/multipleFees')
          },
          {
            label: 'No Fee',
            to: localePath('/examples/components/ConnectFeeWidget/noFee')
          },
          {
            label: 'Payment Override',
            to: localePath('/examples/components/ConnectFeeWidget/paymentOverride')
          },
          {
            label: 'Quantity',
            to: localePath('/examples/components/ConnectFeeWidget/quantity')
          }
        ]
      },
      {
        label: 'Layouts',
        type: 'label'
      },
      {
        label: 'Connect Pay',
        to: localePath('/examples/layouts/ConnectPay')
      },
      {
        label: 'Connect Pay Buttons',
        children: [
          {
            label: 'Regular',
            to: localePath('/examples/layouts/ConnectPayButtons')
          },
          {
            label: 'Stacked',
            to: localePath('/examples/layouts/ConnectPayButtonsStacked')
          }
        ]
      },
      {
        label: 'Connect Pay Tombstone',
        children: [
          {
            label: 'Basic',
            to: localePath('/examples/layouts/ConnectPayTombstone')
          },
          {
            label: 'With Buttons',
            to: localePath('/examples/layouts/ConnectPayTombstoneButtons')
          },
          {
            label: 'With Buttons Stacked',
            to: localePath('/examples/layouts/ConnectPayTombstoneButtonsStacked')
          }
        ]
      }
    ]
  ]
}
