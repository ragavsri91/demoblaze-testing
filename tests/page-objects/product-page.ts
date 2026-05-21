import { expect, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class ProductPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get addToCartButton() {
    return this.page.getByRole('link', { name: 'Add to cart' });
  }

  async addToCart() {
    const dialogPromise = this.page.waitForEvent('dialog');
    await this.addToCartButton.click();
    const dialog = await dialogPromise;
    expect(dialog.message()).toContain('Product added');
    await dialog.accept();
  }
}
