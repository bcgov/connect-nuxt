---
"@sbc-connect/nuxt-auth": minor
---

- BREAKING CHANGE: remove useAuthApi, replaced with useConnectAuthService
- refactor account creation implementation (remove from store, update components/page)
- refactor account store methods to be more streamlined
- refactor account and user initialization into a global bootstrap plugin, reducing redundant network requests
- refactor header notifications to use useQuery - removes unnecessary blocker for app mount
- remove setup accounts middleware (now handled by global bootstrap plugin) and update naming (order prefix) of other middleware
