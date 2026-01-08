import { test, expect } from '@playwright/test'

test.describe('Login Page', () => {
  test('shows login heading and IdP options by default', async ({ page }) => {
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

  test('shows login heading and IdP options for Colin User', async ({ page }) => {
    await page.goto('./auth/login?preset=bcscUser')

    // New bcscUser preset shows welcome alert
    const welcomeAlert = page.getByTestId('bcsc-user-welcome-alert')
    await expect(welcomeAlert).toBeVisible()
    await expect(welcomeAlert).toContainText(/Welcome to the new Business Registry/i)

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
    expect(count, 'expected 1 login option button').toEqual(1)

    // Scope to the card (however you’re locating it)
    await expect(card.getByRole('button', { name: /BC Services Card/i })).toBeVisible()

    // Basic visibility check for each
    for (let i = 0; i < count; i++) {
      await expect(buttons.nth(i)).toBeVisible()
    }
  })
})
