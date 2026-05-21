import { expect, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get placeOrderButton() {
    return this.page.getByRole('button', { name: 'Place Order' });
  }

  get nameInput() {
    return this.page.locator('#name');
  }

  get countryInput() {
    return this.page.locator('#country');
  }

  get cityInput() {
    return this.page.locator('#city');
  }

  get cardInput() {
    return this.page.locator('#card');
  }

  get monthInput() {
    return this.page.locator('#month');
  }

  get yearInput() {
    return this.page.locator('#year');
  }

  get purchaseButton() {
    return this.page.getByRole('button', { name: 'Purchase' });
  }

  get orderConfirmation() {
    return this.page.locator('text=Thank you for your purchase');
  }

  get okButton() {
    return this.page.getByRole('button', { name: 'OK' });
  }

  async openCart() {
    await this.page.click('#cartur');
    await expect(this.placeOrderButton).toBeVisible();
  }

  async clearFirstItemIfAny() {
    const deleteButtons = this.page.locator('a', { hasText: 'Delete' });
    if (await deleteButtons.count() > 0) {
      await deleteButtons.first().click();
    }
  }

  async placeOrder(details: {
    name: string;
    country: string;
    city: string;
    card: string;
    month: string;
    year: string;
  }) {
    await this.placeOrderButton.click();
    await expect(this.nameInput).toBeVisible();
    await this.nameInput.fill(details.name);
    await this.countryInput.fill(details.country);
    await this.cityInput.fill(details.city);
    await this.cardInput.fill(details.card);
    await this.monthInput.fill(details.month);
    await this.yearInput.fill(details.year);
    await this.purchaseButton.click();
    await expect(this.orderConfirmation).toBeVisible({ timeout: 15000 });
    await this.okButton.click().catch(() => {});
  }
}
