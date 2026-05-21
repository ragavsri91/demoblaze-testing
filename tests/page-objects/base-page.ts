import { Page } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;
  protected readonly baseUrl = 'https://www.demoblaze.com';

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path = '') {
    await this.page.goto(`${this.baseUrl}${path}`, {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });
  }
}
