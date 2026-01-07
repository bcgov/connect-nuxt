import { test, expect } from '@playwright/test'

test.describe('Connect Account - Selection Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./auth/account/select')
  })

  test('loads selection view with heading and create new account button', async ({ page }) => {
    const heading = page.getByRole('heading', { level: 1 })
    await expect(heading).toBeVisible()
    await expect(heading).toContainText(/existing account found/i)

    const selectButtons = page.getByTestId('select-account-button-wrapper')
    await expect(selectButtons).toBeVisible()
  })
})

test.describe('Connect Account - Create Flow', () => {
  test.beforeEach(async ({ page }) => {
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
