import { test } from "@playwright/test";
import { LoginPage } from "../../pages/loginPage";
import { ProductsPage } from "../../pages/productsPage";
import { checkoutPage } from "../../pages/checkoutPage";


test.describe("Cart flow Tests", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login();
    await loginPage.expectLoginSuccess();
  });

  test("Add products to cart and checkout", async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const checkout_Page = new checkoutPage(page);
    await productsPage.addAllProductsToCart();
    await checkout_Page.checkout();    

  });
});
