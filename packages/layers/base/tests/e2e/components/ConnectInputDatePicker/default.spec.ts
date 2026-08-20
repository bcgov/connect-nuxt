import { test, expect } from '@playwright/test'

// scoped to the visible UFormField error banner - both a sr-only role="alert"
// span and the visible data-slot="error" div carry the same text, so a plain
// getByText(...) is ambiguous
function errorText(page: import('@playwright/test').Page, text: string) {
  return page.locator('[data-slot="error"]', { hasText: text })
}

test.describe('ConnectInputDatePicker', () => {
  test.describe('Basic', () => {
    test('should be usable via mouse actions', async ({ page }) => {
      await page.clock.setFixedTime(new Date('2025-11-01T12:00:00Z'))
      await page.goto('./examples/components/ConnectInputDatePicker')
      await expect(page.getByRole('heading', { name: 'ConnectInputDatePicker' })).toBeVisible()
      const input = page.locator('#basic-date-picker input')

      await input.click()
      const datepicker = page.getByRole('dialog')
      await expect(datepicker).toBeVisible()

      await datepicker.getByRole('button', { name: '15' }).click()
      await expect(datepicker).not.toBeVisible()

      await expect(input).toHaveValue('November 15, 2025')
    })

    test('normalizes a recognized format to the display format after a pause', async ({ page }) => {
      await page.goto('./examples/components/ConnectInputDatePicker')
      const input = page.locator('#basic-date-picker input')

      await input.fill('2026-07-15')
      await expect(input).toHaveValue('July 15, 2026', { timeout: 2000 })
    })
  })

  test.describe('Schema Validation — Required & Format', () => {
    const submitButton = (page: import('@playwright/test').Page) => page.getByRole('button', { name: 'Submit' }).nth(0)

    test('shows a required error on empty submit and clears it once a valid date is entered', async ({ page }) => {
      await page.goto('./examples/components/ConnectInputDatePicker')
      const input = page.locator('#required-date-picker input')

      await submitButton(page).click()
      await expect(errorText(page, 'Please enter a date')).toBeVisible()

      await input.fill('January 1, 2026')
      await input.blur()
      await expect(errorText(page, 'Please enter a date')).not.toBeVisible()
    })

    test('shows an invalid-format error for unrecognized text and clears it for a recognized one', async ({ page }) => {
      await page.goto('./examples/components/ConnectInputDatePicker')
      const input = page.locator('#required-date-picker input')

      await input.fill('not a date')
      await input.blur()
      await expect(errorText(page, 'Please enter a valid date')).toBeVisible()

      await input.fill('January 1, 2026')
      await input.blur()
      await expect(errorText(page, 'Please enter a valid date')).not.toBeVisible()
    })

    test('selecting a date from the calendar clears a pending required error without an extra blur', async ({
      page
    }) => {
      await page.clock.setFixedTime(new Date('2025-11-01T12:00:00Z'))
      await page.goto('./examples/components/ConnectInputDatePicker')
      const input = page.locator('#required-date-picker input')

      await submitButton(page).click()
      await expect(errorText(page, 'Please enter a date')).toBeVisible()

      await input.click()
      const datepicker = page.getByRole('dialog')
      await expect(datepicker).toBeVisible()
      await datepicker.getByRole('button', { name: '15' }).click()

      await expect(errorText(page, 'Please enter a date')).not.toBeVisible()
      await expect(input).toHaveValue('November 15, 2025')
    })
  })

  test.describe('Schema Validation — Date Range', () => {
    const submitButton = (page: import('@playwright/test').Page) => page.getByRole('button', { name: 'Submit' }).nth(1)

    test('does not require a value but rejects dates outside the configured range', async ({ page }) => {
      await page.goto('./examples/components/ConnectInputDatePicker')
      const input = page.locator('#range-date-picker input')

      // optional field - empty submit should not show a required error
      await submitButton(page).click()
      await expect(errorText(page, 'Date must be between July 1 and July 31, 2026')).not.toBeVisible()

      await input.fill('August 15, 2026')
      await input.blur()
      await expect(errorText(page, 'Date must be between July 1 and July 31, 2026')).toBeVisible()

      await input.fill('July 15, 2026')
      await input.blur()
      await expect(errorText(page, 'Date must be between July 1 and July 31, 2026')).not.toBeVisible()
    })
  })
})
