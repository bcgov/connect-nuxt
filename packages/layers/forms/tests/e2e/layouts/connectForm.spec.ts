import { test, expect } from '@playwright/test'

test.describe('Form Layout', () => {
  test('Loads with expected visuals', async ({ page }) => {
    await page.goto('./examples/layouts/ConnectForm')
    await page.waitForURL('*/**/examples/layouts/ConnectForm')
    await expect(page.getByText('Content wrapped by form layout')).toBeVisible()
    const buttonControlWrapper = page.getByTestId('connect-button-control-wrapper')
    await expect(buttonControlWrapper).toBeVisible()
    const buttonControl = buttonControlWrapper.getByTestId('connect-button-control')
    await expect(buttonControl).toBeVisible()
    const leftButtons = buttonControl.getByTestId('left-buttons')
    await expect(leftButtons).toBeVisible()
    await expect(leftButtons.getByRole('button', { name: 'Left Button 1' })).toBeVisible()
    await expect(leftButtons.getByRole('button', { name: 'Left Button 2' })).toBeVisible()
    const rightButtons = buttonControl.getByTestId('right-buttons')
    await expect(rightButtons).toBeVisible()
    await expect(rightButtons.getByRole('button', { name: 'Right Button 1' })).toBeVisible()
    await expect(rightButtons.getByRole('button', { name: 'Right Button 2' })).toBeVisible()
    await expect(page.getByTestId('connect-header-wrapper')).toBeVisible()
    await expect(page.getByTestId('connect-breadcrumb-wrapper')).toBeVisible()
    await expect(page.getByTestId('connect-main-footer')).toBeVisible()
  })
})
