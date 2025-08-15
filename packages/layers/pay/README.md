# @sbc-connect/nuxt-pay
A Nuxt layer for handling fee calculation and payment processing within the Connect ecosystem.

This package provides the necessary components, composables, and service integrations to use the Connect payment flow, offering a standardized payment experience for all applications.

## Features

### Payment Integration
- Utilities for fetching fees by payment code.
- Components for displaying fee summaries and handling payment actions.


### Core Development Assets
- useConnectFeeStore() Pinia store for managing filing fees and payment status.
- Composables for interacting with the payment API.
- Pre-configured for handling different payment methods (Credit Card, PAD, etc.).

For detailed usage and documentation, please see the [Pay Layer Docs](../../../docs/packages/layers/pay/overview.md).

## Usage

### Install

```bash
pnpm install @sbc-connect/nuxt-pay
```

### Configure
Then add the dependency to `extends` in `nuxt.config`:

> [!NOTE]
> `@sbc-connect/nuxt-pay` already includes `@sbc-connect/nuxt-auth`, it is not necessary to install `@sbc-connect/nuxt-auth`.

```ts
defineNuxtConfig({
  extends: '@sbc-connect/nuxt-pay'
})
```

## Environment Variables
This project requires certain environment variables to be set to run correctly.

Create a file named .env in the root of the project.

Copy the contents of the .env.example file into your new .env file.

### Local Development
For local development, you will need credentials for the interacting with the Pay services.

```
# .env
NUXT_PUBLIC_PAY_API_URL="https://test.api.connect.gov.bc.ca/pay-dev"
NUXT_PUBLIC_PAY_API_VERSION="/api/v1"
NUXT_PUBLIC_X_API_KEY="your-dev-api-key"
```

### Production Environments
> [!IMPORTANT]
> The values for staging and production environments are managed securely and should not be stored in this file.

To obtain the correct values for a production build or deployment, please contact the Connect Platform Team.

## Contributing
We welcome contributions to this package! Please see the main [Contribution Guidelines](../../../CONTRIBUTING.md) for information on our branching strategy, commit conventions, and pull request process.