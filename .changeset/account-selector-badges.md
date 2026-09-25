---
"@sbc-connect/nuxt-auth": minor
---

Account selector: existing-account rows now show the org's mailing address, a payment-method badge, and an NSF/statement-overdue status badge. NSF-suspended accounts are selectable (instead of disabled); clicking one takes the user straight to their account info page instead of into the app.

- `ConnectAccount` gains optional `address`, `paymentMethod`, `hasNsfInvoices`, and `hasOverdueInvoices` fields — all populated by the consuming app (e.g. from pay-api), not by this layer.
- `ConnectAccountExistingList`/`ConnectAccountExistingListItem` gain `showAddress`, `showPaymentMethodBadge`, and `showStatusBadge` props, all defaulting to `true` — existing consumers will see the new UI on upgrade unless they opt out.
- `ConnectAccountExistingListItem` itself now guards the NSF-suspended case: clicking "Use this Account" navigates to `account.urlorigin + account.urlpath` and sets it as `currentAccount` in the store, instead of emitting `select`. Consumers no longer need their own NSF check on this click path.
- `checkAccountStatus`'s redirect-to-`account-freeze` no longer fires on the account-selector pages or anywhere in a `/pay/{token}/...` link flow — those own their own NSF/overdue handling now. This also fixes a bug where a persisted NSF/overdue `currentAccount` could redirect a user away before they ever reached the selector.
- `loadUserAccounts` now always resyncs `currentAccount` from the freshly loaded list (by id), instead of only when the id was missing — a persisted account no longer keeps a stale status after it changes server-side.
- The now-unneeded `{ skipNsfRedirect: true }` option on `switchCurrentAccount`/`checkAccountStatus` has been removed; no public API depended on it before this release.
- Requires an `sbc-auth` release that supports `GET /users/{id}/settings?expand=address` to populate the address field; without it, the field is simply absent and the address line doesn't render.
