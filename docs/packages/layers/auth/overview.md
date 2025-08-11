# Overview of @sbc-connect/nuxt-auth
@sbc-connect/nuxt-auth is designed to provide a standardized set of configurations, components, and utilities for Connect authentication and account features.

## Included Features

### Authentication

- Integration with the BC Government authentication provider.

### User Session Management

After thirty minutes of inactivity, a modal will be displayed prompting the user to interact with the page within two minutes. If the user fails to do so, the user will be signed out.

The timing can be configured via .env file:

```bash
# How often to validate the user token (30s default)
NUXT_PUBLIC_TOKEN_REFRESH_INTERVAL=30000

# When the token is validated, it will be refreshed if it expires within min-validity seconds (120s default)
NUXT_PUBLIC_TOKEN_MIN_VALIDITY=120000

# User inactivity timeout (30m default)
NUXT_PUBLIC_SESSION_INACTIVITY_TIMEOUT=1800000

# Session expired modal countdown (2m default)
NUXT_PUBLIC_SESSION_MODAL_TIMEOUT=120000
```

While these values are configurable, it is recommended to use the default to ensure a secure application.

> [!NOTE]
> If you would like to do an action (e.g., Save draft) before the session expires, you can do so using the `onBeforeSessionExpiry` route meta option.

### Extended Layers
- [@sbc-connect/nuxt-base](../../../../packages/layers/base/README.md)

### Dependencies

- [@sbc-connect/nuxt-base](../../../../packages/layers/base/README.md)
- [Keycloak](https://www.keycloak.org/securing-apps/javascript-adapter)
- [Pinia](https://pinia.vuejs.org/)
- [Pinia Nuxt Module](https://nuxt.com/modules/pinia)
- [pinia-plugin-persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/)

### Components

- ConnectHeaderAccountLabel
- ConnectHeaderAccountOptionsMenu
- ConnectHeaderAuth
- ConnectHeaderAuthenticatedOptions
- ConnectHeaderCreateAccountButton
- ConnectHeaderLoginMenu
- ConnectHeaderNotifications
- ConnectHeaderUnauthenticatedOptions
- ConnectLayout
- ConnectModalSessionExpired

### Stores

- **useConnectAccountStore**

Manages user account information, including fetching a list of all user-associated accounts, tracking the currently selected account, and handling account-specific details like roles and pending approvals. It also provides utilities to check for account status and change the users account.

### Composables

#### useConnectAuth

This provides essential utilities for managing user authentication. It offers functions to log in and out using various identity providers (BCSC, BCEID, IDIR), handles token retrieval and refresh, and exposes reactive state for the user's authentication status and profile information.

> [!IMPORTANT]
> The `getToken` method is the recommended way to retrieve a user's JWT. It safely returns the current JWT and automatically refreshes the token if it's set to expire within thirty seconds.

For specific scenarios where you need to force a token refresh, you can call the method with `true` as an argument, like so: `getToken(true)`. Use this sparingly, as it can cause unnecessary requests to the authentication server.

#### useConnectLaunchDarkly

Similar to `@sbc-connect/nuxt-base`, this composable provides access to the LaunchDarkly integration. See the [examples](../../../../packages/layers/auth/.playground/app/pages/examples/composables/useConnectLaunchDarkly) for usage details.

#### useConnectHeaderOptions

While mainly an internal composable. This can be used to create a custom authenticated Header component.

### Layouts

- ConnectAuth

### Standardized Pages

- **/auth/login:** Standard Connect login page with `return` query option.
- **/auth/logout:** Navigating here will log the user out.

### Middleware

- **connect-auth:** Protect your pages from unauthenticated users with the `connect-auth` middleware.
- **setup-accounts (global):** Accounts will be fetched and the store updated if authenticated.
- **keycloak-params (global):** Keycloak adds url params which are removed.

#### connect-auth

Usage:

```typescript
// pages/protected-page.vue
definePageMeta({
  middleware: 'connect-auth'
})
```

### Utils

- **resetPiniaStores:** Calls all stores `$reset` method or per store by passing the store key (e.g., (resetPiniaStores(['some-key']))).
- **setOnBeforeSessionExpired:** Dynamically change the `onBeforeSessionExpired` route meta option.

### Plugins

- $authApi
- $connectAuth

### App Config

Customize the Connect app with the following App Config options.

```typescript
connect?: {
  login?: {
    redirect?: string // where to redirect the user after login by default (default to same page, overridden by the `return` url param on the login page only)
    idps?: Array<'bcsc' | 'bceid' | 'idir'> // which idp options will be available in the login menus.
  }
  logout?: {
    redirect?: string // where to redirect the user after logout by default (default to same page)
  }
  header?: {
    loginMenu?: boolean // show/hide the header login menu when unauthenticated
    createAccount?: boolean // show/hide the header create account button when unauthenticated
    notifications?: boolean // show/hide the header notifications button when authenticated
    accountOptionsMenu?: boolean // show/hide the header account options menu when authenticated
  }
}
```

### Page Meta

Additional page meta:

```typescript
{
  onBeforeSessionExpired?: () => void | Promise<void> // execute something before the user is logged out
  onAccountChange?: (oldAccount: ConnectAccount, newAccount: ConnectAccount) => boolean
}
```

#### onAccountChange

This is a route meta option that provides a custom function to control whether a user can switch accounts on a specific page.

If defined on a route, this function receives the user's current and selected account objects. Return `true` to allow the user to switch accounts, or return `false` to prevent the user from changing accounts. If the meta option is not defined, the account switch is allowed by default.