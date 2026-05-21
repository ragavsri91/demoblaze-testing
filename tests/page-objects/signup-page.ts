import { expect, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class SignupPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get usernameInput() {
    return this.page.locator('#sign-username');
  }

  get passwordInput() {
    return this.page.locator('#sign-password');
  }

  get signupButton() {
    return this.page.getByRole('button', { name: 'Sign up' });
  }

  async signUp(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    const dialogPromise = this.page.waitForEvent('dialog');
    await this.signupButton.click();
    const dialog = await dialogPromise;
    await expect(dialog.message()).toMatch(/sign up|added|success/i);
    await dialog.accept();
  }
}
