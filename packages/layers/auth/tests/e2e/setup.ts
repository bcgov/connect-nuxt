import { chromium } from '@playwright/test'
import type { Browser, Page } from '@playwright/test'
import { config as dotenvConfig } from 'dotenv'

// load default env
dotenvConfig()

// checks if site is available before running setup
async function isServerReady(url: string, timeout: number = 30000): Promise<boolean> {
  const startTime = Date.now()
  while (Date.now() - startTime < timeout) { // loop until timeout is reached
    try {
      const response = await fetch(url) // try to ping site
      // return true if site is ready
      if (response.ok) {
        return true
      }
    } catch {
      // not ready yet
    }
    await new Promise(resolve => setTimeout(resolve, 1000)) // wait 1sec between fetches
  }
  return false // return false if reached timeout and no site is loaded
}

async function globalSetup() {
  console.info('[E2E Test Setup] Test setup starting...')
  const baseUrl = process.env.NUXT_PUBLIC_BASE_URL!
  console.info(`[E2E Test Setup] base url: ${baseUrl}`)
  // make sure app is available
  console.info('[E2E Test Setup] Checking app availability.')
  const serverReady = await isServerReady(baseUrl)
  if (!serverReady) {
    throw new Error(`[E2E Test Setup] Server at ${baseUrl} did not become ready within the timeout period.`)
  }
  console.info('[E2E Test Setup] App available.')
  // launch browser and create page context
  const browser: Browser = await chromium.launch()
  const context = await browser.newContext()
  const page: Page = await context.newPage()
  // complete login steps
  console.info('[E2E Test Setup] Begin login steps.')
  await page.goto(baseUrl)

  const username = process.env.PLAYWRIGHT_TEST_BCSC_USERNAME!
  const password = process.env.PLAYWRIGHT_TEST_BCSC_PASSWORD!

  await page.getByRole('button', { name: 'Select log in method' }).click()
  await page.getByRole('menuitem', { name: 'BC Services Card' }).click()
  await page.getByLabel('Log in with Test with').click()
  await page.getByLabel('Email or username').fill(username)
  await page.getByLabel('Password').fill(password)
  await page.getByRole('button', { name: 'Continue' }).click()
  console.info('[E2E Test Setup] Login steps complete.')
  // necessary after sign in change
  // const agreeToTerms = page.getByText('I agree to the BC Login')
  // if (agreeToTerms) {
  //   await agreeToTerms.click()
  //   await page.getByRole('button', { name: 'Continue' }).click()
  // }

  // should be redirected back to baseUrl after successful login
  console.info('[E2E Test Setup] Verify redirect after successful login.')
  await page.waitForURL(baseUrl + '**')
  console.info('[E2E Test Setup] Redirect verified.')

  // save auth state and close browser
  console.info('[E2E Test Setup] Saving auth user state.')
  await page.context().storageState({ path: 'tests/e2e/.auth/bcsc-user.json' })
  await browser.close()
  console.info('[E2E Test Setup] Complete.')
}

export default globalSetup
