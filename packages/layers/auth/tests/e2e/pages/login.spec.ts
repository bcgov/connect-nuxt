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
    expect(count, 'expected at least one login option button').toEqual(3)

    // Basic visibility check for each
    for (let i = 0; i < count; i++) {
      await expect(buttons.nth(i)).toBeVisible()
    }
  })

  test('shows login heading and IdP options for Colin User', async ({ page }) => {
    await page.goto('./auth/login?preset=colinUser')

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
    expect(count, 'expected at least one login option button').toEqual(1)

    // Optional: log the accessible names to debug labels
    const buttonLabels = await buttons.allInnerTexts()
    expect(buttonLabels.includes('Login with BC Services Card')).toBe(true)

    // Basic visibility check for each
    for (let i = 0; i < count; i++) {
      await expect(buttons.nth(i)).toBeVisible()
    }
  })
})
