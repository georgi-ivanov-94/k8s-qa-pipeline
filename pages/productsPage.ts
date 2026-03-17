import { Page, Locator, expect } from "@playwright/test";

export class ProductsPage {
  readonly page: Page;
  readonly cartBadge: Locator;
  readonly product: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartBadge = page.locator('span[data-test="shopping-cart-badge"]');
    this.product = page.getByRole("button", { name: `Add to cart`, exact: true });
  }

  async addAllProductsToCart() {
    for (let i=0; i<6; i++) {
      await this.product.first().click()
    }
    await expect(this.cartBadge).toHaveText("6");
  }

}