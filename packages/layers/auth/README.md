[![License](https://img.shields.io/badge/License-BSD%203%20Clause-blue.svg)](LICENSE) [![pkg.pr.new](https://pkg.pr.new/badge/OWNER/REPO)](https://pkg.pr.new/~/bcgov/connect-nuxt)

# @sbc-connect/nuxt-auth
A Nuxt layer for handling user authentication and session management within the Connect ecosystem.

This package provides the necessary composables, plugins, and logic to integrate authentication into a Nuxt application, offering a secure and standardized login experience.

## Features
### Authentication & Session Management
- Integration with the BC Government authentication provider.
- User session management.
- User account management.

### Core Development Assets
- useConnectAuth() composable to access user information and token state.
- login() and logout() helper functions.
- Automatic token refreshing and session validation.

For detailed usage and documentation, please see the [Auth Layer Docs](../../../docs/packages/layers/auth/overview.md).

## Usage

### Install

```bash
pnpm install @sbc-connect/nuxt-auth
```

### Configure
Then add the dependency to `extends` in `nuxt.config`:

> [!NOTE]
> `@sbc-connect/nuxt-auth` already includes `@sbc-connect/nuxt-base`, it is not necessary to install `@sbc-connect/nuxt-base`.

```ts
defineNuxtConfig({
  extends: '@sbc-connect/nuxt-auth'
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