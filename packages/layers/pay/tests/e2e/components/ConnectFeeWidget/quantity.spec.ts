import { test, expect } from '@playwright/test'
import { bsrchFee } from '../../../mocks/fees'

test.describe('Connect Fee (quantity)', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('*/**/fees/BUS/BSRCH?priority=true&futureEffective=true', async (route) => {
      await route.fulfill({ json: bsrchFee })
    })
  })
  test('Loads with expected visuals', async ({ page }) => {
    await page.goto('./examples/components/ConnectFeeWidget/quantity')
    await page.waitForURL('*/**/examples/components/ConnectFeeWidget/quantity')
    await expect(page.getByRole('heading', { name: 'Connect Fee Widget (Quantity Example)' })).toBeVisible()
    await expect(page.getByTestId('fee-widget')).toBeVisible()
    await expect(page.getByTestId('fee-item')).toBeVisible()
    await expect(page.getByTestId('fee-item')).toContainText('Example Fee')
    await expect(page.getByTestId('fee-item')).toContainText('$7.00')
    await expect(page.getByTestId('fee-item')).toContainText('x 1 Quantity Descriptor')
    const serviceFee = page.getByTestId('service-fee')
    await expect(serviceFee).toBeVisible()
    await expect(serviceFee).toContainText('Service Fee')
    await expect(serviceFee).toContainText('$1.50')
    const totalFee = page.getByTestId('total-fee')
    await expect(totalFee).toBeVisible()
    await expect(totalFee).toContainText('Total Fee')
    await expect(totalFee).toContainText('$8.50')
  })
  test('Increasing quantity works as expected', async ({ page }) => {
    await page.goto('./examples/components/ConnectFeeWidget/quantity')
    await page.getByRole('button', { name: 'Increase Quantity' }).click()
    await expect(page.getByTestId('fee-item')).toContainText('$14.00')
    await expect(page.getByTestId('fee-item')).toContainText('x 2 Quantity Descriptor')
    await expect(page.getByTestId('total-fee')).toContainText('$15.50')
  })
})
