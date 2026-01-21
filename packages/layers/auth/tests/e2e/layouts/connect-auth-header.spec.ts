import { test, expect } from '@playwright/test'
import { AccountType } from '#auth/app/enums/account-type'
import { mockApiCallsForSetAccount } from '#auth/testMocks/mock-helpers'

test.describe('Layouts - ConnectHeaderAuth', () => {
  const testCases = [
    {
      accountType: AccountType.PREMIUM,
      expectedLabel: 'Test Tester'
    },
    {
      accountType: AccountType.STAFF,
      expectedLabel: "Ministry of Citizens' Services"
    },
    {
      accountType: AccountType.SBC_STAFF,
      expectedLabel: 'Ministry of Finance'
    }
  ]
  testCases.forEach(({ accountType, expectedLabel }) => {
    test(`${accountType} Account - dropdown`, async ({ page }) => {
      // setup
      await mockApiCallsForSetAccount(page, accountType)
      await page.goto('./examples/layouts/ConnectAuth')
      await page.waitForLoadState('load')
      // test
      const authDropdown = page.locator('#account-options-button')
      await expect(authDropdown).toBeVisible()
      // expected account label is on the button
      expect(authDropdown.getByText(expectedLabel)).toBeVisible()
      // expand dropdown
      await authDropdown.click()
      // expected items are there
      const menu = page.locator('div.account-options-menu-pw-selector')
      expect(menu).toBeVisible()
      expect(menu.getByText('Log out')).toBeVisible()
      expect(menu.getByText('Account Settings')).toBeVisible()
      expect(menu.getByText('Account Info')).toBeVisible()
      expect(menu.getByText('Team Members')).toBeVisible()
      expect(menu.getByText('Transactions')).toBeVisible()
      if (['STAFF', 'SBC_STAFF'].includes(accountType)) {
        expect(menu.getByText('Switch Account')).not.toBeVisible()
      } else {
        expect(menu.getByText('Switch Account')).toBeVisible()
        // second mocked account is visible
        expect(menu.getByText('Test Tester 2')).toBeVisible()
      }
    })
  })
})
