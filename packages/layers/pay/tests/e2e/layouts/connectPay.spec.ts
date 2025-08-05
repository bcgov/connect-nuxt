import { test, expect } from '@playwright/test'
import { bsrchFee } from '../../mocks/fees'

test.describe('Example', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('*/**/fees/BUS/BSRCH?priority=true&futureEffective=true', async (route) => {
      await route.fulfill({ json: bsrchFee })
    })
  })
  test('Example page loads with expected visuals', async ({ page }) => {
    await page.goto('./examples/layouts/ConnectPay')
    await page.waitForURL('*/**/examples/layouts/ConnectPay')
    await expect(page.getByText('Content wrapped by pay layout')).toBeVisible()
    await expect(page.getByTestId('fee-widget')).toBeVisible()
    await expect(page.getByTestId('connect-header-wrapper')).toBeVisible()
    await expect(page.getByTestId('connect-breadcrumb-wrapper')).toBeVisible()
  })
})
