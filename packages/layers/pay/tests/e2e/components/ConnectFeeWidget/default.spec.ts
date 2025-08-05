import { test, expect } from '@playwright/test'
import { bsrchFee } from '../../../mocks/fees'

test.describe('Connect Fee (default)', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('*/**/fees/BUS/BSRCH?priority=true&futureEffective=true', async (route) => {
      await route.fulfill({ json: bsrchFee })
    })
  })
  test('Loads with expected visuals', async ({ page }) => {
    await page.goto('./examples/components/ConnectFeeWidget/default')
    await page.waitForURL('*/**/examples/components/ConnectFeeWidget/default')
    await expect(page.getByRole('heading', { name: 'Connect Fee Widget (Basic Example)' })).toBeVisible()
    await expect(page.getByTestId('fee-widget')).toBeVisible()
    await expect(page.getByTestId('fee-item')).toBeVisible()
    await expect(page.getByTestId('fee-item')).toContainText('Example Placeholder')
    await expect(page.getByTestId('fee-item')).toContainText('$ -')
    const serviceFee = page.getByTestId('service-fee')
    await expect(serviceFee).toBeVisible()
    await expect(serviceFee).toContainText('Service Fee')
    await expect(serviceFee).toContainText('$1.50')
    const totalFee = page.getByTestId('total-fee')
    await expect(totalFee).toBeVisible()
    await expect(totalFee).toContainText('Total Fee')
    await expect(totalFee).toContainText('$ -')
  })
  test('Toggle fee works as expected', async ({ page }) => {
    await page.goto('./examples/components/ConnectFeeWidget/default')
    await page.getByRole('button', { name: 'Toggle Fee' }).click()
    await expect(page.getByTestId('fee-item')).toContainText('Example Fee')
    await expect(page.getByTestId('fee-item')).toContainText('$7.00')
    await expect(page.getByTestId('total-fee')).toContainText('$8.50')
  })
})
