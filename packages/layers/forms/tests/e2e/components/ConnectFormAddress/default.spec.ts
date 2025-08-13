import { test, expect } from '@playwright/test'

test.describe('ConnectFormAddress (default)', () => {
  test('Loads with expected visuals', async ({ page }) => {
    await page.goto('./examples/components/ConnectFormAddress')
    await page.waitForURL('*/**/examples/components/ConnectFormAddress')
    await expect(page.getByRole('heading', { name: 'ConnectFormAddress' }).first()).toBeVisible()
  })

  test('Address Complete is enabled', async ({ page }) => {
    await page.goto('./examples/components/ConnectFormAddress')
    await page.waitForURL('*/**/examples/components/ConnectFormAddress')

    // get default example
    const defaultContainer = page.getByTestId('default')

    // enter Vancouver Art Gallery for lookup address
    const lookupAddress = '750 Hornby St'

    // .fill does not trigger address complete
    await defaultContainer.getByTestId('default-street').pressSequentially(lookupAddress, { delay: 100 })

    // list of options should be displayed
    await expect(page.getByRole('listbox')).toBeVisible({ timeout: 5000 })

    // should be an option that matches the lookup address, select it
    await page.getByRole('option', { name: lookupAddress }).click()

    // assert fields are populated after selection
    await expect(page.getByTestId('default-street')).toHaveValue(lookupAddress)
    await expect(page.getByTestId('default-city')).toHaveValue('Vancouver')
    await expect(page.getByTestId('default-region')).toContainText('British Columbia')
    await expect(page.getByTestId('default-postalCode')).toHaveValue('V6Z 2H7')
  })
})
