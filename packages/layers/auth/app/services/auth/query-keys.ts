// https://pinia-colada.esm.dev/guide/query-keys.html

/**
 * IMPORTANT: Query Key Hierarchy
 * * Our cache follows a strict hierarchy: ['business', accountId, businessId, resource, params].
 * * 1. ACCOUNT ISOLATION: The 'base' (AccountId) MUST remain as the first dynamic segment.
 * This prevents cross-account data leakage when switching accounts.
 * * 2. NESTING: Sub-resources (comments, docs) are nested under their parent IDs (e.g., filingId).
 * This allows us to invalidate an entire "folder" by targeting the parent key.
 * * 3. ORDER: When updating keys, ensure the order of existing segments is preserved.
 * Changing the order may break existing invalidation logic across the app.
*/

export const useConnectAuthQueryKeys = () => {
  const { authUser } = useConnectAuth()
  const { currentAccount } = storeToRefs(useConnectAccountStore())

  const base = () => ['connect', 'auth', authUser.value?.keycloakGuid] as const

  const keys = {
    userProfile: () => [...base(), 'user-profile'] as const,
    pendingApprovals: () => [...base(), 'org', currentAccount.value?.id, 'pending-approvals'] as const,
    termsOfUse: () => [...base(), 'terms-of-use'] as const,
    userSettings: () => [...base(), 'user-settings'] as const
  }

  return { keys }
}
