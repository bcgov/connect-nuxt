import type { Page } from '@playwright/test'

import { getUserSettingsMock } from '#auth/testMocks/auth'

export const mockApiCallsForSetAccount = async (
  page: Page,
  accountType: 'PREMIUM' | 'STAFF' | 'SBC_STAFF' = 'PREMIUM'
) => {
  page.route('**/users/**/settings', async (route) => {
    await route.fulfill({ json: getUserSettingsMock(accountType) })
  })
}
