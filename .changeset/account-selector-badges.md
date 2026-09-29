---
"@sbc-connect/nuxt-auth": minor
---

Account selector: existing-account rows now show the org's mailing address, a payment-method badge, and an NSF/statement-overdue status badge. NSF-suspended accounts are selectable (instead of disabled); clicking one takes the user straight to their account info page instead of into the app.

- `ConnectAccount` receives optional `address`, `paymentMethod`, `hasNsfInvoices`, and `hasOverdueInvoices` fields.
- `ConnectAccountExistingList`/`ConnectAccountExistingListItem` receives `showAddress`, `showPaymentMethodBadge`, and `showStatusBadge` props, all defaulting to `false` — existing consumers see no change on upgrade unless they opt in. The layer's own `/auth/account/select` page opts in to `showStatusBadge` so it keeps showing the NSF indicator.

