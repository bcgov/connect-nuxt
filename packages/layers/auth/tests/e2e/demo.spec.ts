import { test, expect } from '@playwright/test'

test.describe('Demo tests', () => {
  test('Base page loads with expected visuals 1', async ({ page }) => {
    await page.goto('./demo')
    const demoBtn = page.locator('data-testid=demo-btn')
    const demoDiv = page.locator('data-testid=demo-div')
    await expect(demoBtn).toBeVisible()
    await expect(demoDiv).not.toBeVisible()
    await demoBtn.click()
    await expect(demoDiv).toBeVisible()
    await expect(demoDiv.getByText('Hello from Auth!')).toBeVisible()
  })
})
