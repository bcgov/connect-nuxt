import { test, expect } from '@playwright/test'
import { bsrchFee, bcincFee, cgoodFee, nm620Fee } from '../../../mocks/fees'

test.describe('Connect Fee (multiple fees)', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('*/**/fees/BUS/BSRCH?priority=true&futureEffective=true', async (route) => {
      await route.fulfill({ json: bsrchFee })
    })
    await page.route('*/**/fees/BUS/CGOOD?priority=true&futureEffective=true', async (route) => {
      await route.fulfill({ json: cgoodFee })
    })
    await page.route('*/**/fees/BC/BCINC?priority=true&futureEffective=true', async (route) => {
      await route.fulfill({ json: bcincFee })
    })
    await page.route('*/**/fees/NRO/NM620?priority=true&futureEffective=true', async (route) => {
      await route.fulfill({ json: nm620Fee })
    })
  })
  test('Loads with expected visuals', async ({ page }) => {
    await page.goto('./examples/components/ConnectFeeWidget/multipleFees')
    await page.waitForURL('*/**/examples/components/ConnectFeeWidget/multipleFees')
    await expect(page.getByRole('heading', { name: 'Connect Fee Widget (Multiple Fees Example)' })).toBeVisible()
    await expect(page.getByTestId('fee-widget')).toBeVisible()
    const fees = await page.getByTestId('fee-item').all()
    expect(fees.length).toBe(4)
    await expect(fees[0]).toContainText('Example Fee1')
    await expect(fees[0]).toContainText('$7.00')
    await expect(fees[1]).toContainText('Example Fee2')
    await expect(fees[1]).toContainText('$25.00')
    await expect(fees[2]).toContainText('Example Fee3')
    await expect(fees[2]).toContainText('$30.00')
    await expect(fees[3]).toContainText('Example Fee4')
    await expect(fees[3]).toContainText('$350.00')
    const serviceFee = page.getByTestId('service-fee')
    await expect(serviceFee).toBeVisible()
    await expect(serviceFee).toContainText('Service Fee')
    await expect(serviceFee).toContainText('$1.50')
    const totalFee = page.getByTestId('total-fee')
    await expect(totalFee).toBeVisible()
    await expect(totalFee).toContainText('Total Fee')
    await expect(totalFee).toContainText('$413.50')
  })
})
