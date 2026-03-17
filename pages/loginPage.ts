import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.locator("#user-name");
    this.passwordField = page.locator("#password");
    this.loginButton = page.locator("#login-button");
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com");
  }

  async login() {
    await this.usernameField.fill("standard_user");
    await this.passwordField.fill("secret_sauce");
    await this.loginButton.click();
  }

  async expectLoginSuccess() {
   await expect(this.page.getByText("Products", {exact:true})).toBeVisible();
  }
}
