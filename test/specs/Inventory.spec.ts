import { config } from "../../wdio.conf";
import InventoryPage from "../pageobjects/inventory.page";
import LoginWithCookies from "../support/SetLoginCookies";
import productData from "../testData/catalaog/productsData";
describe("User is not able to access catalog page before login", () => {
  it("User is not able to access catalog page before login", async () => {
    await InventoryPage.open();
    // await expect(await InventoryPage.notLogedErrorText()).toBe(InventoryPage.expectedNotLogedErrorText)
    await expect(await browser.getUrl()).toBe(config.baseUrl);
  });
});

describe("Catalog page is dislaying correct items", () => {
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
});

describe("Add to cart functionality tests", () => {
  productData.forEach(({ id }, i) => {
    it("Catalog items have add to cart button which is working", async () => {
      const product: Product = await InventoryPage.getProductFromCatalog(id);
      await InventoryPage.clickAddToCartButton(product);
      await expect(await InventoryPage.removeFromCartButton).toBeExisting();
      //checking if cart icon is responding with every added product
      const currentCartAmmount: number = parseInt(
        await (await InventoryPage.shoppingCartCurrentAmmount).getText()
      );
      await expect(currentCartAmmount).toBe(i + 1);
    });
  });

  productData.forEach(({ id }) => {
    it("Catalog items have remove from cart button which is working", async () => {
      const cartAmmountBefore = parseInt(
        await (await InventoryPage.shoppingCartCurrentAmmount).getText()
      );
      let currentCartAmmount: number;

      const product: Product = await InventoryPage.getProductFromCatalog(id);
      await InventoryPage.clickRemoveFromCartButton(product);
      await expect(await InventoryPage.addToCartButton).toExist();

      //checking if removing product from the cart updated cart icon
      if (cartAmmountBefore > 1) {
        currentCartAmmount = parseInt(
          await InventoryPage.shoppingCartCurrentAmmount.getText()
        );
        await expect(currentCartAmmount).toBe(cartAmmountBefore - 1);
      } else {
        //if product in cart are 0, there should not icon with number displayed
        await expect(currentCartAmmount).toBe(undefined);
      }
    });
  });
});

describe("product filtering funcionality tests", async () => {
  it("Filtering product from z to a", async () => {
    //geting original list of items and sorting it from z to a manualy
    const itemsSortedAZ = await InventoryPage.getAllProductsNamesAndPrices();
    itemsSortedAZ.sort((a, b) => b.name.localeCompare(a.name));
    //sorting items on the page and getting sorted list of products
    await InventoryPage.selectFilterBy("value", "za");
    const itemsSortedZA = await InventoryPage.getAllProductsNamesAndPrices();
    //checking if list was sorted correctly
    console.log(itemsSortedZA.length, "length");
    await expect(itemsSortedZA.length).toStrictEqual(itemsSortedZA.length);
    for (let i = 0; i <= itemsSortedZA.length; i++) {
      await expect(itemsSortedZA[i]).toStrictEqual(itemsSortedAZ[i]);
    }
  });
  it("Filtering product from lowest price to highest price", async () => {
    //geting original list of items and sorting it from high price to low price manualy
    const itemListOriginal: { name: string; price: number }[] =
      await InventoryPage.getAllProductsNamesAndPrices();
    itemListOriginal.sort((a, b) => a.price - b.price);
    console.log("log,", itemListOriginal);

    //sorting items on the page and getting sorted list of products
    await InventoryPage.selectFilterBy("value", "lohi");
    const itemsSortedHighToLowPrice =
      await InventoryPage.getAllProductsNamesAndPrices();
    for (let i = 0; i < itemListOriginal.length; i++) {
      await expect(itemsSortedHighToLowPrice[i].price).toBe(
        itemListOriginal[i].price
      );
    }
  });
});
