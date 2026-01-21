import type { Page } from '@playwright/test'
import { AccountType } from '#auth/app/enums/account-type'
import { getUserSettingsMock } from '#auth/testMocks/auth'

export const mockApiCallsForSetAccount = async (
  page: Page,
  accountType: AccountType = AccountType.PREMIUM
) => {
  page.route('**/users/**/settings', async (route) => {
    await route.fulfill({ json: getUserSettingsMock(accountType) })
  })
}
