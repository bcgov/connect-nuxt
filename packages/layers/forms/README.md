[![License](https://img.shields.io/badge/License-BSD%203%20Clause-blue.svg)](LICENSE) [![pkg.pr.new](https://pkg.pr.new/badge/OWNER/REPO)](https://pkg.pr.new/~/bcgov/connect-nuxt)

# @sbc-connect/nuxt-forms
A Nuxt layer for building and managing complex forms within the Connect ecosystem.

This package provides a library of reusable form components, integrated validation logic, and composables to standardize form creation and handling across all filings.

## Features

### Form Management
- A comprehensive set of accessible, pre-styled form input components.
- Standardized validation schemas using Zod for consistent error handling.

### Core Development Assets
- Pre-built components for common inputs like addresses, postal codes, names, emails and phone numbers.
- Reusable Zod schemas to manage the input validations.

For detailed usage and API documentation, please see the [Forms Layer Docs](../../../docs/packages/layers/forms/overview.md).

## Usage

### Install

```bash
pnpm install @sbc-connect/nuxt-forms
```

### Configure
Then add the dependency to `extends` in `nuxt.config`:

> [!NOTE]
> `@sbc-connect/nuxt-forms` already includes `@sbc-connect/nuxt-base`, it is not necessary to install `@sbc-connect/nuxt-base`.

```ts
defineNuxtConfig({
  extends: '@sbc-connect/nuxt-forms'
})
```

## Environment Variables
This project requires certain environment variables to be set to run correctly.

Create a file named .env in the root of the project.

Copy the contents of the .env.example file into your new .env file.

### Local Development
Copy the contents of the **.env.example** file into your new .env file.

### Production Environments
> [!IMPORTANT]
> The values for staging and production environments are managed securely and should not be stored in this file.

To obtain the correct values for a production build or deployment, please contact the Connect Platform Team.

## Contributing
We welcome contributions to this package! Please see the main [Contribution Guidelines](../../../CONTRIBUTING.md) for information on our branching strategy, commit conventions, and pull request process.