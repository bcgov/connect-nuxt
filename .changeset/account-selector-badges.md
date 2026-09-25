---
"@sbc-connect/nuxt-auth": minor
---

Account selector: existing-account rows now show the org's mailing address, a payment-method badge, and an NSF/statement-overdue status badge. NSF-suspended accounts are selectable (instead of disabled); clicking one takes the user straight to their account info page instead of into the app.

- `ConnectAccount` receives optional `address`, `paymentMethod`, `hasNsfInvoices`, and `hasOverdueInvoices` fields.
- `ConnectAccountExistingList`/`ConnectAccountExistingListItem` receives `showAddress`, `showPaymentMethodBadge`, and `showStatusBadge` props, all defaulting to `true` — existing consumers will see the new UI on upgrade unless they opt out.
