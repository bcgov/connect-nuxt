import { test, expect } from '@playwright/test'
import { bsrchFee } from '../../../mocks/fees'
import { padAccount, pendingPadAccount } from '../../../mocks/paymentAccounts'

test.describe('Connect Fee (payment override)', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('*/**/fees/BUS/BSRCH?priority=true&futureEffective=true', async (route) => {
      await route.fulfill({ json: bsrchFee })
    })
    await page.route('*/**/accounts/undefined', async (route) => {
      await route.fulfill({ json: padAccount })
    })
  })
  test('Loads with expected visuals', async ({ page }) => {
    await page.goto('./examples/components/ConnectFeeWidget/paymentOverride')
    await page.waitForURL('*/**/examples/components/ConnectFeeWidget/paymentOverride')
    await expect(page.getByRole('heading', { name: 'Connect Fee Widget (Payment Override Example)' })).toBeVisible()
    await expect(page.getByText('Selected Payment: PAD')).toBeVisible()
    const feeWidget = page.getByTestId('fee-widget')
    await expect(feeWidget).toBeVisible()
    const overrideBtn = feeWidget.getByText('Pre-authorized Debit (PAD) XXX4567')
    await expect(overrideBtn).toBeVisible()
  })

  test('Toggle override works as expected', async ({ page }) => {
    await page.goto('./examples/components/ConnectFeeWidget/paymentOverride')
    await page.waitForURL('*/**/examples/components/ConnectFeeWidget/paymentOverride')
    const feeWidget = page.getByTestId('fee-widget')
    await expect(feeWidget).toBeVisible()
    const overrideBtn = feeWidget.getByText('Pre-authorized Debit (PAD) XXX4567')
    await expect(overrideBtn).toBeVisible()
    await overrideBtn.click()
    const ccOption = page.getByText('Credit Card')
    await expect(ccOption).toBeVisible()
    await ccOption.click()
    // Should be set to credit card
    await expect(feeWidget.getByText('Paying with Credit Card')).toBeVisible()
    await expect(page.getByText('Selected Payment: DIRECT_PAY')).toBeVisible()
  })
})

test.describe('Connect Fee (payment override, pad pending)', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('*/**/fees/BUS/BSRCH?priority=true&futureEffective=true', async (route) => {
      await route.fulfill({ json: bsrchFee })
    })
    await page.route('*/**/accounts/undefined', async (route) => {
      await route.fulfill({ json: pendingPadAccount })
    })
  })
  test('Loads with expected visuals', async ({ page }) => {
    await page.goto('./examples/components/ConnectFeeWidget/paymentOverride')
    await page.waitForURL('*/**/examples/components/ConnectFeeWidget/paymentOverride')
    await expect(page.getByRole('heading', { name: 'Connect Fee Widget (Payment Override Example)' })).toBeVisible()
    await expect(page.getByText('Selected Payment: DIRECT_PAY')).toBeVisible()
    const feeWidget = page.getByTestId('fee-widget')
    await expect(feeWidget).toBeVisible()
    const overrideBtn = feeWidget.getByText('Paying with Credit Card')
    await expect(overrideBtn).toBeVisible()
  })

  test('Toggle override works as expected with pad pending', async ({ page }) => {
    await page.goto('./examples/components/ConnectFeeWidget/paymentOverride')
    await page.waitForURL('*/**/examples/components/ConnectFeeWidget/paymentOverride')
    const feeWidget = page.getByTestId('fee-widget')
    await expect(feeWidget).toBeVisible()
    const overrideBtn = feeWidget.getByText('Paying with Credit Card')
    await expect(overrideBtn).toBeVisible()
    await overrideBtn.click()
    const padOption = page.getByText('Pre-authorized Debit (PAD) XXX4567')
    await expect(padOption).toBeVisible()
    await padOption.click()
    // expect modal
    const modal = page.getByRole('dialog')
    await expect(modal).toBeVisible()
    await expect(modal.getByRole('heading', { name: 'PAD Account in Confirmation Period' })).toBeVisible()
    // close modal
    await modal.getByRole('button', { name: 'Close' }).click()
    // Should still be set to credit card
    await expect(feeWidget.getByText('Paying with Credit Card')).toBeVisible()
  })
})
