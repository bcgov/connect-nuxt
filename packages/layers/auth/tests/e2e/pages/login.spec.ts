import { test, expect } from '@playwright/test'

test.describe('Login Page', () => {
  test('Login page loads with expected visuals', async ({ page }) => {
    await page.goto('./auth/login')
    await expect(page.getByRole('heading', { name: 'SBC Connect Account Login' })).toBeVisible()
  })
})
