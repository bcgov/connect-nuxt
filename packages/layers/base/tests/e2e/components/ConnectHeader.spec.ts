import { test, expect } from '@playwright/test'

test.describe('ConnectHeader tests', () => {
  test('Loads component example page with expected visuals', async ({ page }) => {
    await page.goto('./examples/components/ConnectHeader')
    // header wrapper
    const headerWrapper = page.getByTestId('connect-header-wrapper').first()
    await expect(headerWrapper).toBeVisible()
    // home link
    const homeLink = headerWrapper.getByRole('link', { name: 'Home' })
    await expect(homeLink).toBeVisible()
    await expect(homeLink.getByRole('img', { name: 'Government of British Columbia Logo' })).toBeVisible()
    await expect(homeLink.getByText('Service BC Connect')).toBeVisible()
    // locale select
    await expect(headerWrapper.getByTestId('locale-select-dropdown')).toBeVisible()
  })
})
