---
"@sbc-connect/nuxt-auth": patch
---

- handle user session expiry in auth plugin
- onBeforeSessionExpiry route meta
- onAccountChange route meta
- resetPiniaStores util and reset on logout
- add account id to layouts/ConnectAuth breadcrumb slot

issue: bcgov/entity#29335
