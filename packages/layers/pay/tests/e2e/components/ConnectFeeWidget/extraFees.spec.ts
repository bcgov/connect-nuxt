import { test, expect } from '@playwright/test'
import { bcincFee, nm620Fee } from '../../../mocks/fees'

test.describe('Connect Fee (extra fees)', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('*/**/fees/BC/BCINC?priority=true&futureEffective=true', async (route) => {
      await route.fulfill({ json: bcincFee })
    })
    await page.route('*/**/fees/NRO/NM620?priority=true&futureEffective=true', async (route) => {
      await route.fulfill({ json: nm620Fee })
    })
  })
  test('Loads with expected visuals', async ({ page }) => {
    await page.goto('./examples/components/ConnectFeeWidget/extraFees')
    await page.waitForURL('*/**/examples/components/ConnectFeeWidget/extraFees')
    await expect(page.getByRole('heading', { name: 'Connect Fee Widget (Extra Fees Example)' })).toBeVisible()
    await expect(page.getByTestId('fee-widget')).toBeVisible()
    const fees = await page.getByTestId('fee-item').all()
    expect(fees.length).toBe(2)
    await expect(fees[0]!).toContainText('Priority Option Fee')
    await expect(fees[0]!).toContainText('$30.00')
    await expect(fees[1]!).toContainText('Future Effective Option Fee')
    await expect(fees[1]!).toContainText('$350.00')
    const priorityFee = page.getByTestId('priority-fee')
    await expect(priorityFee).toBeVisible()
    await expect(priorityFee).toContainText('Priority Fee')
    await expect(priorityFee).toContainText('$100.00')
    const futureEffectiveFee = page.getByTestId('future-effective-fee')
    await expect(futureEffectiveFee).toBeVisible()
    await expect(futureEffectiveFee).toContainText('Future Effective Fee')
    await expect(futureEffectiveFee).toContainText('$100.00')
    const serviceFee = page.getByTestId('service-fee')
    await expect(serviceFee).toBeVisible()
    await expect(serviceFee).toContainText('Service Fee')
    await expect(serviceFee).toContainText('$1.50')
    const totalFee = page.getByTestId('total-fee')
    await expect(totalFee).toBeVisible()
    await expect(totalFee).toContainText('Total Fee')
    await expect(totalFee).toContainText('$581.50')
  })

  test('Can toggle extra priority fee', async ({ page }) => {
    await page.goto('./examples/components/ConnectFeeWidget/extraFees')
    await page.waitForURL('*/**/examples/components/ConnectFeeWidget/extraFees')
    const toggleBtn = page.getByRole('button', { name: 'Toggle Priority' })
    await expect(toggleBtn).toBeVisible()
    await toggleBtn.click({ force: true })
    await expect(page.getByTestId('priority-fee')).not.toBeVisible()
    await expect(page.getByTestId('total-fee')).toContainText('$481.50')
    // toggle it back
    await toggleBtn.click({ force: true })
    await expect(page.getByTestId('priority-fee')).toBeVisible()
    await expect(page.getByTestId('total-fee')).toContainText('$581.50')
  })

  test('Can toggle extra future effective fee', async ({ page }) => {
    await page.goto('./examples/components/ConnectFeeWidget/extraFees')
    await page.waitForURL('*/**/examples/components/ConnectFeeWidget/extraFees')
    const toggleBtn = page.getByRole('button', { name: 'Toggle Future Effective' })
    await expect(toggleBtn).toBeVisible()
    await toggleBtn.click({ force: true })
    await expect(page.getByTestId('future-effective-fee')).not.toBeVisible()
    await expect(page.getByTestId('total-fee')).toContainText('$481.50')
    // toggle it back
    await toggleBtn.click({ force: true })
    await expect(page.getByTestId('future-effective-fee')).toBeVisible()
    await expect(page.getByTestId('total-fee')).toContainText('$581.50')
  })
})
