[![License](https://img.shields.io/badge/License-BSD%203%20Clause-blue.svg)](LICENSE) [![pkg.pr.new](https://pkg.pr.new/badge/OWNER/REPO)](https://pkg.pr.new/~/bcgov/connect-nuxt)

# @sbc-connect/nuxt-base
The foundational Nuxt layer for all Connect applications.

This package contains the core UI components, styling, and utilities for the Connect ecosystem. Extend this layer in your Nuxt project to get a consistent, on-brand starting point with zero configuration.

## Features

### BC Government Branding
- Official color theme and design tokens
- BCSans font family with pre-configured @font-face rules
- BC Government logos and favicon assets

### Core Development Assets
- A library of reusable base components
- Essential composables for common application logic
- Standard utility functions
- Pre-configured for Internationalization (i18n)

For detailed usage and documentation, please see the [Base Layer Docs](../../../docs/packages/layers/base/overview.md)

## Usage

### Install
```bash
pnpm install @sbc-connect/nuxt-base
```

### Configure
Then add the dependency to `extends` in `nuxt.config`:

```ts
defineNuxtConfig({
  extends: '@sbc-connect/nuxt-base'
})
```

### Environment Variables
This project requires certain environment variables to be set to run correctly.

Create a file named .env in the root of the project.

#### Local Development
Copy the contents of the **.env.example** file into your new .env file.

#### Production Environments
> [!IMPORTANT]
> The values for staging and production environments are managed securely and should not be stored in this file.

To obtain the correct values for a production build or deployment, please contact the Connect Platform Team.

## Contributing

We welcome contributions to this package! Please see the main [Contribution Guidelines](../../../CONTRIBUTING.md) for information on our branching strategy, commit conventions, and pull request process.