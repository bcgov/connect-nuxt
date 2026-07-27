import { test, expect } from '@playwright/test'

test.describe('ConnectInputDate', () => {
  test.describe('Basic', () => {
    test('should be usable via mouse actions', async ({ page }) => {
      await page.clock.setFixedTime(new Date('2025-11-01T12:00:00Z'))
      await page.goto('./examples/components/ConnectInputDate')
      await expect(page.getByRole('heading', { name: 'ConnectInputDate' })).toBeVisible()

      const section = page.getByTestId('basic-date')
      const input = section.getByRole('textbox')

      // open the calendar via the calendar icon button
      await section.getByRole('button', { name: 'label.selectDate' }).click()
      const datepicker = page.getByRole('dialog')
      await expect(datepicker).toBeVisible()

      await datepicker.getByRole('button', { name: '15' }).click()
      await expect(datepicker).not.toBeVisible()

      await expect(input).toHaveValue('November 15, 2025')
    })

    test('should be usable via keyboard actions', async ({ page }) => {
      await page.clock.setFixedTime(new Date('2025-11-12T12:00:00Z'))
      await page.goto('./examples/components/ConnectInputDate')
      await expect(page.getByRole('heading', { name: 'ConnectInputDate' })).toBeVisible()

      const section = page.getByTestId('basic-date')
      const input = section.getByRole('textbox')
      const calendarBtn = section.getByRole('button', { name: 'label.selectDate' })

      // tab from the text input to the calendar button and open it with Enter
      await input.focus()
      await page.keyboard.press('Tab')
      await expect(calendarBtn).toBeFocused()
      await page.keyboard.press('Enter')

      const datepicker = page.getByRole('dialog')
      await expect(datepicker).toBeVisible()

      // first button in the calendar header should be focused (Previous year)
      await expect(datepicker.getByRole('button', { name: 'Previous year' })).toBeFocused()

      // tab 4 times to move focus into the calendar grid
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')

      // should set focus to current date in grid (the 12th)
      await expect(datepicker.getByRole('button', { name: /November 12/ })).toBeFocused()

      // move focus 1 right and 1 down in grid
      await page.keyboard.press('ArrowRight')
      await page.keyboard.press('ArrowDown')

      // should set focus to the 20th
      await expect(datepicker.getByRole('button', { name: /November 20/ })).toBeFocused()

      await page.keyboard.press('Enter')
      await expect(datepicker).not.toBeVisible()
      await expect(input).toHaveValue('November 20, 2025')
    })

    test('should update datepicker as you type', async ({ page }) => {
      await page.clock.setFixedTime(new Date('2025-11-01T12:00:00Z'))
      await page.goto('./examples/components/ConnectInputDate')
      await expect(page.getByRole('heading', { name: 'ConnectInputDate' })).toBeVisible()

      const section = page.getByTestId('basic-date')
      const input = section.getByRole('textbox')
      const calendarBtn = section.getByRole('button', { name: 'label.selectDate' })

      // type a date in a parseable format
      await input.focus()
      await page.keyboard.type('2022-10-15')

      // wait for the 500 ms debounce to normalize the typed value to display format
      await expect(input).toHaveValue('October 15, 2022')

      // open the calendar — it should reflect the typed date
      await calendarBtn.click()
      const datepicker = page.getByRole('dialog')
      await expect(datepicker).toBeVisible()

      await expect(datepicker.getByText('October 2022', { exact: true })).toBeVisible()
      await expect(datepicker.getByRole('button', { name: '15' })).toHaveAttribute('data-selected', 'true')

      await page.keyboard.press('Escape')
      await expect(datepicker).not.toBeVisible()

      await expect(input).toHaveValue('October 15, 2022')
    })
  })

  test.describe('Form', () => {
    test('should display submitted date value', async ({ page }) => {
      await page.clock.setFixedTime(new Date('2025-11-01T12:00:00Z'))
      await page.goto('./examples/components/ConnectInputDate')
      await expect(page.getByRole('heading', { name: 'ConnectInputDate' })).toBeVisible()

      const section = page.getByTestId('form-date')
      const calendarBtn = section.getByRole('button', { name: 'label.selectDate' })
      const submitBtn = page.getByRole('button', { name: 'Submit' })

      // select a date via the calendar
      await calendarBtn.click()
      const datepicker = page.getByRole('dialog')
      await expect(datepicker).toBeVisible()

      await datepicker.getByRole('button', { name: '15' }).click()
      await expect(datepicker).not.toBeVisible()

      // submit and verify the API-format date is displayed
      await submitBtn.click()
      await expect(page.locator('code').filter({ hasText: '2025-11-15' })).toBeVisible()
    })
  })

  test.describe('Validation', () => {
    test('should show error when required=true (default) and input is empty', async ({ page }) => {
      await page.goto('./examples/components/ConnectInputDate')
      const section = page.getByTestId('basic-date')
      const input = section.getByRole('textbox')

      // fill then clear so the watch fires with an empty value
      await input.fill('x')
      await input.fill('')

      // auto-retries until the 500 ms debounce fires and the error class appears
      await expect(section.locator('.text-error')).toBeVisible()
    })

    test('should not show error when required=false and input is empty', async ({ page }) => {
      await page.goto('./examples/components/ConnectInputDate')
      const section = page.getByTestId('optional-date')
      const input = section.getByRole('textbox')

      // fill then clear so the watch fires with an empty value
      await input.fill('x')
      await input.fill('')

      // paragraph stays text-neutral — no validation error for an optional empty field
      await expect(section.locator('.text-error')).not.toBeVisible()
    })

    test('should show and clear min-date error', async ({ page }) => {
      await page.goto('./examples/components/ConnectInputDate')
      const section = page.getByTestId('min-only-date')
      const input = section.getByRole('textbox')

      // date before minimum — debounce fires and shows error
      await input.fill('June 30, 2026')
      await expect(section.getByText('Date must be on or after July 1, 2026').first()).toBeVisible()

      // date on the minimum — debounce fires and clears error
      await input.fill('July 1, 2026')
      await expect(section.getByText('Date must be on or after July 1, 2026').first()).not.toBeVisible()
    })

    test('should show and clear max-date error', async ({ page }) => {
      await page.goto('./examples/components/ConnectInputDate')
      const section = page.getByTestId('max-only-date')
      const input = section.getByRole('textbox')

      // date after maximum — debounce fires and shows error
      await input.fill('August 1, 2026')
      await expect(section.getByText('Date must be on or before July 31, 2026').first()).toBeVisible()

      // date on the maximum — debounce fires and clears error
      await input.fill('July 31, 2026')
      await expect(section.getByText('Date must be on or before July 31, 2026').first()).not.toBeVisible()
    })

    test('should show range error for both out-of-range directions', async ({ page }) => {
      await page.goto('./examples/components/ConnectInputDate')
      const section = page.getByTestId('min-max-date')
      const input = section.getByRole('textbox')
      const errorText = 'Date must be between July 1, 2026 and July 31, 2026'

      // before min
      await input.fill('June 30, 2026')
      await expect(section.getByText(errorText).first()).toBeVisible()

      // after max
      await input.fill('August 1, 2026')
      await expect(section.getByText(errorText).first()).toBeVisible()

      // within range — error clears
      await input.fill('July 15, 2026')
      await expect(section.getByText(errorText).first()).not.toBeVisible()
    })

    test('should show self-defined error message', async ({ page }) => {
      await page.goto('./examples/components/ConnectInputDate')
      const section = page.getByTestId('self-defined-date')
      const input = section.getByRole('textbox')

      await input.fill('June 30, 2026')
      await expect(
        section.getByText('Date must not be before the corp founding date (July 1, 2026)').first()
      ).toBeVisible()
    })
  })
})
