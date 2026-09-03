import { test, expect } from '@playwright/test'
import { mockApiCallsForSetAccount } from '#auth/testMocks/mock-helpers'

test.describe('Login Page', () => {
  test('shows login heading and IdP options by default', async ({ page }) => {
    await mockApiCallsForSetAccount(page)
    await page.goto('./auth/login')

    // Heading exists (localization-friendly)
    const heading = page.getByRole('heading', { level: 1 })
    await expect(heading).toBeVisible()
    await expect(heading).toContainText(/login/i)

    // Scope to the card (image + buttons sit inside UCard)
    const card = page.getByTestId('login-card')

    await expect(card).toBeVisible()

    // Find all login buttons inside the card
    const buttons = card.getByRole('button')
    const count = await buttons.count()
    expect(count, 'expected 3 login options button').toEqual(3)

    // Basic visibility check for each
    for (let i = 0; i < count; i++) {
      await expect(buttons.nth(i)).toBeVisible()
    }
  })

  test('hides the description by default (empty default message)', async ({ page }) => {
    await mockApiCallsForSetAccount(page)
    await page.goto('./auth/login')

    await expect(page.getByTestId('login-card')).toBeVisible()
    await expect(page.getByTestId('login-description')).toBeHidden()
  })

  test('shows a description resolved from the lang file via preset', async ({ page }) => {
    await mockApiCallsForSetAccount(page)
    await page.goto('./auth/login?preset=customDescription')

    const description = page.getByTestId('login-description')
    await expect(description).toBeVisible()
    await expect(description).toContainText(
      'PLAYGROUND ONLY - This login description is set by the customDescription preset.'
    )
  })

  test('ignores an invalid ?idp= and shows the login options', async ({ page }) => {
    await mockApiCallsForSetAccount(page)
    await page.goto('./auth/login?idp=notanidp')

    const card = page.getByTestId('login-card')
    await expect(card).toBeVisible()
    expect(await card.getByRole('button').count()).toEqual(3)
  })
})
