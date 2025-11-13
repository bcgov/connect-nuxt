import { test, expect } from '@playwright/test'
import { bsrchFee } from '../../mocks/fees'

test.describe('Layouts - Connect Pay Tombstone', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('*/**/fees/BUS/BSRCH?priority=true&futureEffective=true', async (route) => {
      await route.fulfill({ json: bsrchFee })
    })
  })
  test('Layout loads with expected visuals', async ({ page }) => {
    await page.goto('./examples/layouts/ConnectPayTombstone')
    await page.waitForURL('*/**/examples/layouts/ConnectPayTombstone')
    await expect(page.getByText('Content wrapped by layout')).toBeVisible()
    await expect(page.getByTestId('fee-widget')).toBeVisible()
    await expect(page.getByTestId('connect-header-wrapper')).toBeVisible()
    await expect(page.getByTestId('connect-breadcrumb-wrapper')).toBeVisible()
    await expect(page.getByTestId('connect-button-control-wrapper')).not.toBeVisible()
    await expect(page.getByTestId('connect-button-control')).not.toBeVisible()
    await expect(page.getByTestId('connect-tombstone-wrapper')).toBeVisible()
  })
})
