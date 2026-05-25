import { argosScreenshot } from '@argos-ci/playwright'
import { test, expect } from '@playwright/test';
import { HomePage } from './page-objects/home-page';
import { LoginPage } from './page-objects/login-page';
import { SignupPage } from './page-objects/signup-page';
import { ProductPage } from './page-objects/product-page';
import { CartPage } from './page-objects/cart-page';
import { ContactPage } from './page-objects/contact-page';

function uniqueUserName() {
  return `user_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
}

test.describe('Signup_with_credentials', () => {
  test('successful signup with new credentials', async ({ page }) => {
    const homePage = new HomePage(page);
    const signupPage = new SignupPage(page);
    const userName = uniqueUserName();

    await homePage.goto();
    await homePage.openSignupModal();
    await signupPage.signUp(userName, 'StrongPass123!');
  });
});

test.describe('login_with_valid_credentials', () => {
  test('logs in with valid credentials and shows home page', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.goto();
    await homePage.openLoginModal();
    await loginPage.login('Ragavnomad', 'Mercury@123');
    await loginPage.expectLoggedIn('Ragavnomad');

    // After login succeeds
await argosScreenshot(page, 'Login successful-homepage')
  });
});

test.describe('UiComponents (sliders)', () => {
  test('verifies homepage slider controls and category navigation', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();
    const nextButton = page.locator('button:has-text("Next")').first();
    const prevButton = page.locator('button:has-text("Previous")').first();

    await expect(nextButton).toBeVisible();
    await nextButton.click();
    await prevButton.click();

    await homePage.navigateToCategory('Phones');
    await expect(page.getByRole('link', { name: 'Samsung galaxy s6' })).toBeVisible();

    await homePage.navigateToCategory('Laptops');
    await expect(page.getByRole('link', { name: 'Sony vaio i5' })).toBeVisible();

    await homePage.navigateToCategory('Monitors');
    await expect(page.getByRole('link', { name: 'Apple monitor 24' })).toBeVisible();
  });
});

test.describe('Navigating_products', () => {
  test('selects a product from each category and adds to cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    await homePage.goto();

    await homePage.openProduct('Phones', 'Samsung galaxy s6');
    await productPage.addToCart();
    await homePage.goto();

    await homePage.openProduct('Laptops', 'Sony vaio i5');
    await productPage.addToCart();
    await homePage.goto();

    await homePage.openProduct('Monitors', 'Apple monitor 24');
    await productPage.addToCart();
  });
});

test.describe('Checkout_with_valid_details', () => {
  test('navigates to the cart, updates items, and completes purchase', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);

    await homePage.goto();
    await homePage.openCart();
    await cartPage.clearFirstItemIfAny();
    await cartPage.placeOrder({
      name: 'Test User',
      country: 'USA',
      city: 'New York',
      card: '4111111111111111',
      month: '12',
      year: '2028',
    });
  });
});

test.describe('Contact_us_feature', () => {
  test('opens contact form, sends a valid message, and closes the dialog', async ({ page }) => {
    const homePage = new HomePage(page);
    const contactPage = new ContactPage(page);

    await homePage.goto();
    await homePage.openContact();
    await contactPage.sendMessage('test@example.com', 'Demo User', 'Hello from test automation');
  });
});
