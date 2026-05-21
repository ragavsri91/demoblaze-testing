import { expect, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class ContactPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get emailInput() {
    return this.page.locator('#recipient-email');
  }

  get nameInput() {
    return this.page.locator('#recipient-name');
  }

  get messageTextarea() {
    return this.page.locator('#message-text');
  }

  get sendButton() {
    return this.page.getByRole('button', { name: 'Send message' });
  }

  get closeButton() {
    return this.page.getByRole('button', { name: 'Close' }).first();
  }

  async sendMessage(email: string, name: string, message: string) {
    await expect(this.emailInput).toBeVisible();
    await this.emailInput.fill(email);
    await this.nameInput.fill(name);
    await this.messageTextarea.fill(message);
    await this.sendButton.click({ force: true });
    const dialog = await this.page.waitForEvent('dialog', { timeout: 10000 }).catch(() => null);
    if (dialog) {
      expect(dialog.message()).toMatch(/thank you|message|send/i);
      await dialog.accept();
    }
    await this.closeButton.click().catch(() => {});
  }
}
