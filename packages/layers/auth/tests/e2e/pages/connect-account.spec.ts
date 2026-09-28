import { test, expect } from '@playwright/test'
import { mockApiCallsForSetAccount } from '#auth/testMocks/mock-helpers'

test.describe('Connect Account - Selection Flow', () => {
  test.beforeEach(async ({ page }) => {
    await mockApiCallsForSetAccount(page)
    await page.goto('./auth/account/select')
  })

  test('loads selection view with heading and create new account button', async ({ page }) => {
    const heading = page.getByRole('heading', { level: 1 })
    await expect(heading).toBeVisible()
    await expect(heading).toContainText(/select your account or create a new one/i)

    const selectButtons = page.getByTestId('select-account-button-wrapper')
    await expect(selectButtons).toBeVisible()
  })
})

test.describe('Connect Account - Create Flow', () => {
  test.beforeEach(async ({ page }) => {
    await mockApiCallsForSetAccount(page)
    await page.goto('./auth/account/create')
  })

  test('loads selection view with heading and create new account button', async ({ page }) => {
    const heading = page.getByRole('heading', { level: 1 })
    await expect(heading).toBeVisible()
    await expect(heading).toContainText('Service BC Account Creation')

    const selectButtons = page.getByTestId('create-account-button-wrapper')
    await expect(selectButtons).toBeVisible()
  })
})

test.describe('Connect Account - NSF Suspended Account', () => {
  // urlorigin/urlpath point back at the test app itself so the "external" redirect
  // on click is a real, observable navigation without leaving the test environment.
  const nsfAccount = {
    accountStatus: 'NSF_SUSPENDED',
    accountType: 'PREMIUM',
    id: 9999,
    label: 'NSF Test Account',
    type: 'ACCOUNT',
    urlorigin: 'http://localhost:3000',
    urlpath: '/examples/layouts/ConnectAuth'
  }

  test.beforeEach(async ({ page }) => {
    await mockApiCallsForSetAccount(page)
    // Overrides the settings route registered above with an NSF-suspended account.
    await page.route('**/users/**/settings**', async (route) => {
      await route.fulfill({ json: [nsfAccount] })
    })
    await page.goto('./auth/account/select')
  })

  test('shows the non-sufficient-funds badge and keeps the account selectable', async ({ page }) => {
    await expect(page.getByText('Non-Sufficient Funds')).toBeVisible()

    const useAccountButton = page.getByTestId('choose-existing-account-button')
    await expect(useAccountButton).toBeEnabled()
  })

  test('redirects to the account info page instead of proceeding into the app', async ({ page }) => {
    await page.getByTestId('choose-existing-account-button').click()
    await page.waitForURL(`${nsfAccount.urlorigin}${nsfAccount.urlpath}`)
  })
})
