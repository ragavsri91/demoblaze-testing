import { expect, Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  get usernameInput() {
    return this.page.locator('#loginusername');
  }

  get passwordInput() {
    return this.page.locator('#loginpassword');
  }

  get submitButton() {
    return this.page.getByRole('button', { name: 'Log in' });
  }

  get userLabel() {
    return this.page.locator('#nameofuser');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async expectLoggedIn(username: string) {
    // Wait until the `#nameofuser` element contains non-empty text (stable across browsers)
    await this.page.waitForFunction(() => {
      const el = document.querySelector('#nameofuser');
      return !!el && el.textContent && el.textContent.trim().length > 0;
    }, {}, { timeout: 30000 });
    await expect(this.userLabel).toBeVisible({ timeout: 30000 });
    await expect(this.userLabel).toContainText(new RegExp(username, 'i'), { timeout: 30000 });
  }
}
