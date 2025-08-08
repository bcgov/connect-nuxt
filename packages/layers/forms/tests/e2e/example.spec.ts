import { test, expect } from '@playwright/test'

test.describe('Examples Page', () => {
  test('Base examples page loads with expected visuals', async ({ page }) => {
    await page.goto('./')
    await page.waitForURL('*/**/')
    await expect(page.getByRole('heading', { name: 'Connect Form Layer Examples' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Layout Examples' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Component Examples' })).toBeVisible()
  })
})
