import { config } from "../../wdio.conf";
import InventoryPage from "../pageobjects/inventory.page";
import LoginWithCookies from "../support/SetLoginCookies";
import productData from "../testData/catalaog/productsData";
describe("Inventory page catalog items tests", () => {
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

  productData.forEach(({ id, name, description, price }) => {
    it("Catalog should have correct products listed", async () => {
      await InventoryPage.open();
      const product = await InventoryPage.getProductFromCatalog(id);
      await expect(await product.name).toBe(name);
      await expect(await product.description).toBe(description);
      await expect(await product.price).toBe(price);
    });
  });

  productData.forEach(({ id },i) => {
    it("Catalog items have add to cart button which is working", async () => {
      const product:Product = await InventoryPage.getProductFromCatalog(id);
      await InventoryPage.clickAddToCartButton(product);
      const isExisting:boolean = await InventoryPage.removeFromCartButton.isExisting()
      await expect(await isExisting).toBe(true);
      //checking if cart icon is responding
      const currentCartAmmount:number = parseInt(await (await InventoryPage.shoppingCartCurrentAmmount).getText());
      await expect(currentCartAmmount).toBe((i+1));
    });
  });
  productData.forEach(({ id },i) => {
    it("Catalog items have remove from cart button which is working", async () => {
      const cartAmmountBefore=parseInt(await (await InventoryPage.shoppingCartCurrentAmmount).getText());
      let currentCartAmmount:number;
      const product:Product = await InventoryPage.getProductFromCatalog(id);
      await InventoryPage.clickRemoveFromCartButton(product);
      const isExisting:boolean = await InventoryPage.addToCartButton.isExisting()
      await expect(await isExisting).toBe(true);
      if (cartAmmountBefore > 1) {
        currentCartAmmount = parseInt(await InventoryPage.shoppingCartCurrentAmmount.getText());
        await expect(currentCartAmmount).toBe((cartAmmountBefore - 1));
      } else {
        await expect(currentCartAmmount).toBe(undefined);
      }
      });
  });

  // it("Cart icon is responding if products are added", async ()=>{
  //   const product = await InventoryPage.getProductFromCatalog(2);
  //   await InventoryPage.clickAddToCartButton(product);
    
  // })
 after( async ()=>{
  await browser.debug();
 })
});
