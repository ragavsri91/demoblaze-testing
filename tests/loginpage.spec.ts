import { argosScreenshot } from '@argos-ci/playwright'
import { test, expect } from '@playwright/test'

test.describe('Demoblaze login', () => {
  test('should login with valid credentials', async ({ page }) => {
    await page.goto('https://www.demoblaze.com')

    await page.click('#login2')

    await expect(page.locator('#loginusername')).toBeVisible()
    await page.fill('#loginusername', 'Ragavnomad')
    await page.fill('#loginpassword', 'Mercury@123')

    const loginButton = page.getByRole('button', { name: 'Log in' })
    await expect(loginButton).toBeVisible()
    await loginButton.click()

    const userLabel = page.locator('#nameofuser')
    await expect(userLabel).toBeVisible()
    await expect(userLabel).toHaveText(/Ragavnomad|Welcome/i)
    // After login succeeds
await argosScreenshot(page, 'homepage-after-login')
  })
})