# Overview of @sbc-connect/nuxt-pay
@sbc-connect/nuxt-pay is designed to provide a standardized set of configurations, components, and utilities for Connect payment features.

## Included Features

### Extended Layers
- [@sbc-connect/nuxt-base](../base/overview.md)
- [@sbc-connect/nuxt-auth](../auth/overview.md)

### Configuration and Project Setup
This layer provides core configurations and setup elements, including:

- All setup configuration in [@sbc-connect/nuxt-base](../base/overview.md#configuration-and-project-setup)
- All setup configuration in [@sbc-connect/nuxt-auth](../auth/overview.md#configuration-and-project-setup)

### BC Government Theme and Styling
Components for BC Government branding and styling:

- All theme and styling from [@sbc-connect/nuxt-base](../base/overview.md#bc-government-theme-and-styling)
- All theme and styling from [@sbc-connect/nuxt-auth](../auth/overview.md#bc-government-theme-and-styling)

### Dependencies

- All dependencies from [@sbc-connect/nuxt-base](../base/overview.md#dependencies)
- All dependencies from [@sbc-connect/nuxt-auth](../auth/overview.md#dependencies)

### Components

- ConnectFeeWidget
  - Note: usage is tightly coupled with [useConnectFeeStore](./overview.md#stores)
  - [Examples](../../../../packages/layers/pay/.playground/app/pages/examples/components/ConnectFeeWidget)

- All components from [@sbc-connect/nuxt-base](../base/overview.md#components)
- All components from [@sbc-connect/nuxt-auth](../auth/overview.md#components)

### Composables

- All composables from [@sbc-connect/nuxt-base](../base/overview.md#composables)
- All composables from [@sbc-connect/nuxt-auth](../auth/overview.md#composables)

### Stores

- useConnectFeeStore
  - Intended for use with the ConnectFeeWidget to add/remove fees, etc.
  - Usage:
    - __initFees__([_fee_code_info_, _fee_code_info_, ...], _fee_placeholder_info_, _options_)
      - Pulls fee information for all codes from the pay api and stores it, and sets placeholder information determining the values in the ConnectFeeWidget when no fees are added. This __should be called first__ before attempting add fees.
    - __addReplaceFee__(_fee_code_, _options_)
      - Adds or replaces the current fee information used by the ConnectFeeWidget for the given fee code. Optionally sets quantity information or other fee flags (i.e. priority)
    - __removeFee__(_fee_code_)
      - Removes the current fee information used by the ConnectFeeWidget for the given fee code.
    - __initAlternatePaymentMethod__
      - Initializes and enables the payment override dropdown in the ConnectFeeWidget based on the user payment account. When in use, the user selection is mapped to the `userSelectedPaymentMethod` value returned from the store. This value should be passed to the pay api when creating the invoice.
    - __$reset__
      - resets all store values to their defaults
  - [Examples](../../../../packages/layers/pay/.playground/app/pages/examples)

- All stores from [@sbc-connect/nuxt-auth](../auth/overview.md#stores)

### Layouts

- ConnectPay
  - [Examples](../../../../packages/layers/pay/.playground/app/pages/examples/layouts/ConnectPay.vue)
- All layouts from [@sbc-connect/nuxt-base](../base/overview.md#layouts)
- All layouts from [@sbc-connect/nuxt-auth](../auth/overview.md#layouts)

### Standardized Pages

- All pages from [@sbc-connect/nuxt-base](../base/overview.md#pages)
- All pages from [@sbc-connect/nuxt-auth](../auth/overview.md#pages)

### Plugins

- Pay API fetch: `$payApi`
- All plugins from [@sbc-connect/nuxt-base](../base/overview.md#plugins)
- All plugins from [@sbc-connect/nuxt-auth](../auth/overview.md#plugins)

### App Config

- All app config options from [@sbc-connect/nuxt-base](../base/overview.md#app-config)
- All app config options from [@sbc-connect/nuxt-auth](../auth/overview.md#app-config)

### Page Meta

- All page meta from [@sbc-connect/nuxt-base](../base/overview.md#page-meta)
- All page meta from [@sbc-connect/nuxt-auth](../auth/overview.md#page-meta)