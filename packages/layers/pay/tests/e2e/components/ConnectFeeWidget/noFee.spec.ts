import { test, expect } from '@playwright/test'
import { nocoiFee } from '../../../mocks/fees'

test.describe('Connect Fee (no fee)', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('*/**/fees/CC/NOCOI?priority=true&futureEffective=true', async (route) => {
      await route.fulfill({ json: nocoiFee })
    })
  })
  test('Loads with expected visuals', async ({ page }) => {
    await page.goto('./examples/components/ConnectFeeWidget/noFee')
    await page.waitForURL('*/**/examples/components/ConnectFeeWidget/noFee')
    await expect(page.getByRole('heading', { name: 'Connect Fee Widget (No Fee Example)' })).toBeVisible()
    await expect(page.getByTestId('fee-widget')).toBeVisible()
    await expect(page.getByTestId('fee-item')).toBeVisible()
    await expect(page.getByTestId('fee-item')).toContainText('Officer Change')
    await expect(page.getByTestId('fee-item')).toContainText('No Fee')
    const totalFee = page.getByTestId('total-fee')
    await expect(totalFee).toBeVisible()
    await expect(totalFee).toContainText('Total Fees')
    await expect(totalFee).toContainText('$0.00')
  })
})
