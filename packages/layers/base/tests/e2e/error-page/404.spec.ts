import { test, expect } from '@playwright/test'

test.describe('Error.vue', () => {
  test('Displays expected visuals with 404 error', async ({ page }) => {
    await page.goto('./examples/error-page/404')
    // should display base layout elements
    // header
    const header = page.getByTestId('connect-header-wrapper')
    await expect(header).toBeVisible()
    // footer
    const footer = page.getByTestId('connect-main-footer')
    await expect(footer).toBeVisible()

    // error text
    await expect(page.getByRole('heading', { name: '404 Page Not Found' })).toBeVisible()
    await expect(page.getByText('This page could not be found or does not exist.')).toBeVisible()
    
    // should display a link/button to return home
    await expect(page.getByRole('link', { name: 'Go Home' })).toBeVisible()
  })
})