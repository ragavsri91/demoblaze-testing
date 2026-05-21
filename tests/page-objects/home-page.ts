import { expect, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await super.goto();
  }

  get loginButton() {
    return this.page.locator('#login2');
  }

  get signupButton() {
    return this.page.locator('#signin2');
  }

  get cartLink() {
    return this.page.locator('#cartur');
  }

  get contactLink() {
    return this.page.getByRole('link', { name: 'Contact' });
  }

  async openLoginModal() {
    await this.loginButton.click();
    await expect(this.page.locator('#loginusername')).toBeVisible();
  }

  async openSignupModal() {
    await this.signupButton.click();
    await expect(this.page.locator('#sign-username')).toBeVisible();
  }

  async navigateToCategory(category: string) {
    await this.page.getByRole('link', { name: category }).click();
    await expect(this.page.locator('.card-title').first()).toBeVisible({ timeout: 15000 });
  }

  async clickProduct(productName: string) {
    await this.page.getByRole('link', { name: productName }).first().click();
  }

  async openProduct(category: string, productName: string) {
    await this.navigateToCategory(category);
    await expect(this.page.getByRole('link', { name: productName }).first()).toBeVisible();
    await this.clickProduct(productName);
  }

  async openCart() {
    await this.cartLink.click();
  }

  async openContact() {
    await this.contactLink.click();
    await expect(this.page.locator('#recipient-email')).toBeVisible();
  }
}
