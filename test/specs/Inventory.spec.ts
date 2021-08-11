import { config } from "../../wdio.conf";
import InventoryPage from "../pageobjects/inventory.page";
import LoginWithCookies from "../support/SetLoginCookies";
import productData from "../testData/catalaog/productsData";
describe("", () => {
  it("User is not able to access catalog page before login", async () => {
    await InventoryPage.open();
    // await expect(await InventoryPage.notLogedErrorText()).toBe(InventoryPage.expectedNotLogedErrorText)
    await expect(await browser.getUrl()).toBe(config.baseUrl);
  });
  before(() => {
    //setting cookies for next text
    InventoryPage.open();
    LoginWithCookies("session-username", "standard_user");
  });

  productData.forEach(({ id, name, description }) => {
    it("Catalog should have correct products listed", async () => {
      await InventoryPage.open();
      const product = await InventoryPage.getProductFromCatalog(id);
      await expect(await product.name).toBe(name);
      await expect(await product.description).toBe(description);
    });
  });
});
