import ItemData from "../testData/catalaog/productsData";
import CheckoutPage from "../pageobjects/checkout.page";
import InventoryPage from "../pageobjects/inventory.page";
import LoginWithCookies from "../support/SetLoginCookies";
import { config } from "../../wdio.conf";

describe("User is not able to access catalog page before login", () => {
  it("User is not able to access catalog page before login", async () => {
    await CheckoutPage.open();
    await expect(await browser.getUrl()).toBe(config.baseUrl);
  });
});
describe("User can checkout a product", () => {
  before(() => {
    //setting cookies for next tests
    LoginWithCookies("session-username", "standard_user");
  });

  it("Checkout page is displaying correct items in cart", async () => {
    InventoryPage.open();
    const productToAdd:Product =await  InventoryPage.getProductFromCatalog(ItemData[0].id);
    await productToAdd.button.click();
    await CheckoutPage.open();
    const itemInCartName:string = await (await CheckoutPage.inCartItemName).getText();
    await expect(itemInCartName).toBe(productToAdd.name)

    await browser.debug();
    await (await CheckoutPage.checkOutButton).click();
  });
});

describe("Catalog page is dislaying correct items", () => {});
