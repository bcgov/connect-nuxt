import { test, expect } from '@playwright/test'

test.describe('ConnectInputDate', () => {
  test.describe('Basic', () => {
    test('should be usable via mouse actions', async ({ page }) => {
      await page.clock.setFixedTime(new Date('2025-11-01T12:00:00Z'))
      await page.goto('./examples/components/ConnectInputDate')
      await expect(page.getByRole('heading', { name: 'ConnectInputDate' })).toBeVisible()
      const input = page.getByTestId('basic-date')

      await input.click()
      const datepicker = page.getByRole('dialog')
      await expect(datepicker).toBeVisible()

      await datepicker.getByRole('button', { name: '15' }).click()
      await expect(datepicker).not.toBeVisible()

      await expect(input).toHaveValue('2025-11-15')
    })

    test('should be usable via keyboard actions', async ({ page }) => {
      await page.clock.setFixedTime(new Date('2025-11-12T12:00:00Z'))
      await page.goto('./examples/components/ConnectInputDate')
      await expect(page.getByRole('heading', { name: 'ConnectInputDate' })).toBeVisible()
      const input = page.getByTestId('basic-date')

      await input.focus()
      const datepicker = page.getByRole('dialog')
      await expect(datepicker).toBeVisible()

      // move focus from input into datepicker grid
      await page.keyboard.press('ArrowDown')

      // first button should be focused
      await expect(datepicker.getByRole('button', { name: 'Previous year' })).toBeFocused()

      // tab 4 times to move focus into grid
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')

      // should set focus to current date in grid (the 12th)
      await expect(datepicker.getByRole('button', { name: /November 12/ })).toBeFocused()

      // move focus 1 right and 1 down in grid
      await page.keyboard.press('ArrowRight')
      await page.keyboard.press('ArrowDown')

      // should set focus to current new date in grid (the 20th)
      await expect(datepicker.getByRole('button', { name: /November 20/ })).toBeFocused()

      await page.keyboard.press('Enter')
      await expect(datepicker).not.toBeVisible()
      await expect(input).toHaveValue('2025-11-20')
    })

    test('should update datepicker as you type', async ({ page }) => {
      await page.clock.setFixedTime(new Date('2025-11-01T12:00:00Z'))
      await page.goto('./examples/components/ConnectInputDate')
      await expect(page.getByRole('heading', { name: 'ConnectInputDate' })).toBeVisible()
      const input = page.getByTestId('basic-date')

      await input.focus()
      const datepicker = page.getByRole('dialog')
      await expect(datepicker).toBeVisible()

      await page.keyboard.type('2022')

      await expect(datepicker.getByText('January 2022', { exact: true })).toBeVisible()

      await page.keyboard.type('10')

      await expect(datepicker.getByText('October 2022', { exact: true })).toBeVisible()

      await page.keyboard.type('15')

      await expect(datepicker.getByText('October 2022', { exact: true })).toBeVisible()
      await expect(datepicker.getByRole('button', { name: '15' })).toHaveAttribute('data-selected', 'true')

      await page.keyboard.press('Escape')
      await expect(datepicker).not.toBeVisible()

      await expect(input).toHaveValue('2022-10-15')
    })
  })

  test.describe('Form', () => {
    test('should trigger and clear validation when selecting a date', async ({ page }) => {
      await page.clock.setFixedTime(new Date('2025-11-01T12:00:00Z'))
      await page.goto('./examples/components/ConnectInputDate')
      await expect(page.getByRole('heading', { name: 'ConnectInputDate' })).toBeVisible()
      const submitButton = page.getByRole('button', { name: 'Submit' })

      const messages: string[] = []

      // should log date on submit
      page.on('console', (msg) => {
        messages.push(msg.text())
      })

      await submitButton.click()
      await expect(page.getByText('Date must be in YYYY-MM-DD format')).toBeVisible()
      expect(messages).not.toContain('2025-11-15')

      const input = page.getByTestId('form-date')

      await input.click()
      const datepicker = page.getByRole('dialog')
      await expect(datepicker).toBeVisible()

      await datepicker.getByRole('button', { name: '15' }).click()
      await expect(datepicker).not.toBeVisible()
      await expect(input).toHaveValue('2025-11-15')

      await submitButton.click()
      await expect(page.getByText('Date must be in YYYY-MM-DD format')).not.toBeVisible()
      expect(messages).toContain('2025-11-15')
    })
  })
})
