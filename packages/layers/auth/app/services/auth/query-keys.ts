// https://pinia-colada.esm.dev/guide/query-keys.html

/**
 * IMPORTANT: Query Key Hierarchy
 * * Our cache follows a strict hierarchy: ['connect', 'auth', keycloakGuid, ...rest].
 * * 1. GUID ISOLATION: The 'base' (keycloakGuid) MUST remain as the first dynamic segment.
 * This allows us to invalidate an entire "folder" by targeting the parent key.
 * * 2. ORDER: When updating keys, ensure the order of existing segments is preserved.
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
