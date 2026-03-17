import { Page, Locator, expect } from "@playwright/test";

export class checkoutPage {
  readonly page: Page;
  readonly cartButton: Locator;
  readonly checkoutbutton: Locator;
  readonly firstname: Locator;
  readonly lastname: Locator;
  readonly postalcode: Locator;
  readonly finishbutton: Locator; 
  readonly doneasserttion: Locator;
  readonly cartitems: Locator;
  readonly continuebutton: Locator;
  readonly productprice: Locator;
  readonly subtotal: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartButton = page.locator("a[data-test='shopping-cart-link']");
    this.checkoutbutton = page.locator("button[id='checkout']").first();
    this.cartitems = page.locator(".cart_item");
    this.firstname = page.locator("#first-name");
    this.lastname = page.locator("#last-name");
    this.postalcode = page.locator("#postal-code");
    this.continuebutton = page.locator("input[id='continue']");
    this.productprice = page.locator(".inventory_item_price");
    this.finishbutton = page.locator("button[id='finish']");
    this.doneasserttion = page.getByText("Thank you for your order!", {exact:true});
    this.subtotal = page.locator(".summary_subtotal_label");
    this.cartBadge = page.locator('span[data-test="shopping-cart-badge"]');

  }

  async checkout() {

    await this.cartButton.click();
    await expect(this.cartitems).toHaveCount(6);
    await expect(this.cartBadge).toHaveText("6");
    await this.checkoutbutton.click();

    await this.firstname.fill("John");
    await this.lastname.fill("Doe");
    await this.postalcode.fill("12345");

    await this.continuebutton.click();
    
    const count = await this.productprice.count();
    let total = 0;

    for (let i = 0; i < count; i++) {
    const text = await this.productprice.nth(i).innerText();
    total += parseFloat(text.replace('$', ''));
    }

    expect(this.subtotal).toHaveText(`Item total: $${total.toFixed(2)}`);
    
    await this.finishbutton.click();
    await expect(this.doneasserttion).toBeVisible();

  }


}
