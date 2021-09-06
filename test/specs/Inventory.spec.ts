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
      await expect(await InventoryPage.removeFromCartButton).toBeExisting();
    
      //checking if cart icon is responding with every added product
      const currentCartAmmount:number = parseInt(await (await InventoryPage.shoppingCartCurrentAmmount).getText());
      await expect(currentCartAmmount).toBe((i+1));
    });
  });

  productData.forEach(({ id }) => {
    it("Catalog items have remove from cart button which is working", async () => {
      const cartAmmountBefore=parseInt(await (await InventoryPage.shoppingCartCurrentAmmount).getText());
      let currentCartAmmount:number;

      const product:Product = await InventoryPage.getProductFromCatalog(id);
      await InventoryPage.clickRemoveFromCartButton(product);
      await expect(await InventoryPage.addToCartButton).toExist();

      //checking if removing product from the cart updated cart icon
      if (cartAmmountBefore > 1) {
        currentCartAmmount = parseInt(await InventoryPage.shoppingCartCurrentAmmount.getText());
        await expect(currentCartAmmount).toBe((cartAmmountBefore - 1));
      } else {
        //if product in cart are 0, there should not icon with number displayed
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
