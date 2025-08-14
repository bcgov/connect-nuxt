import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import type { Page } from '@playwright/test'

async function scanA11y(page: Page) {
  // TODO: banner needs to be in a landmark
  const accessibilityScanResults = await new AxeBuilder({ page }).exclude(['#connect-system-banner']).analyze()
  expect(accessibilityScanResults.violations).toEqual([])
}

test.describe('ConnectFormAddress', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./examples/forms/ConnectFormAddress')
    await page.waitForURL('*/**/examples/forms/ConnectFormAddress')
  })

  test('Loads with expected visuals', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'ConnectFormAddress' }).first()).toBeVisible()
    await scanA11y(page)
  })

  test('should display validation errors for required fields on submit', async ({ page }) => {
    await page.getByRole('button', { name: 'Submit' }).click()

    const container = page.getByTestId('delivery-address-container')
    const streetField = container.getByTestId('delivery-address-field-street')
    const cityField = container.getByTestId('delivery-address-field-city')
    const regionField = container.getByTestId('delivery-address-field-region')
    const postalCodeField = container.getByTestId('delivery-address-field-postalCode')

    const streetError = streetField.locator('[id$="-error"]')
    await expect(streetError).toBeVisible()
    await expect(streetError).toContainText('This field is required')

    const cityError = cityField.locator('[id$="-error"]')
    await expect(cityError).toBeVisible()
    await expect(cityError).toContainText('This field is required')

    const regionError = regionField.locator('[id$="-error"]')
    await expect(regionError).toBeVisible()
    await expect(regionError).toContainText('This field is required')

    const postalCodeError = postalCodeField.locator('[id$="-error"]')
    await expect(postalCodeError).toBeVisible()
    await expect(postalCodeError).toContainText('This field is required')

    await expect(page.locator('#form-title')).toHaveClass(/text-red-600/)
    await expect(page.locator('form')).toHaveClass(/border-error/)
    await expect(page.locator('#delivery-address-input-street')).toBeFocused()
    await scanA11y(page)
  })

  test('should submit successfully with valid data', async ({ page }) => {
    await page.locator('#delivery-address-input-street').fill('750 Hornby St')
    await page.locator('#delivery-address-input-city').fill('Vancouver')
    await page.locator('#delivery-address-input-region').click()
    await page.getByRole('option', { name: 'British Columbia' }).click()
    await page.locator('#delivery-address-input-postalCode').fill('V6Z 2H7')

    const submitButton = page.getByRole('button', { name: 'Submit' })
    await submitButton.click()
    await expect(submitButton).toBeDisabled()
    await expect(submitButton).toBeEnabled({ timeout: 5000 })
    // await scanA11y(page) // TODO: hover colour primary/75 opacity with white text fails contrast check, do we care?
  })
})
