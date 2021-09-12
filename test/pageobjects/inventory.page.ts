import Page from "./page";
import inventoryPageIds from "./PageObjecrsId/inventoryPageIds";
import InventoryPageId from "./PageObjecrsId/inventoryPageIds";
/**
 * sub page containing specific selectors and methods for a specific page
 */
class InventoryPage extends Page {
  /**
   * define selectors using getter methods
   */
  get wrongCredentialsErrorText(): WebdriverIO.Element {
    return $(InventoryPageId.wrongCredentialsText);
  }
  get catalogItemTitle(): string {
    return InventoryPageId.catalogItemTitle;
  }
  get catalogItemDescription(): string {
    return InventoryPageId.catalogItemDescription;
  }
  get productBlock(): WebdriverIO.Element {
    return $(InventoryPageId.productBlock);
  }
  get allProducts(): WebdriverIO.ElementArray {
    return $$(InventoryPageId.allProducts);
  }
  get addToCartButton(): WebdriverIO.Element {
    return $(InventoryPageId.addToCartButton);
  }
  get removeFromCartButton(): WebdriverIO.Element {
    return $(InventoryPageId.removeFromCartButton);
  }
  public expectedNotLogedErrorText: string =
  InventoryPageId.expectedNotLogedErrorText;
  get catalogItemPrice(): string {
    return InventoryPageId.catalogItemPrice;
  }
  get shoppingCartCurrentAmmount(): WebdriverIO.Element {
    return $(
     inventoryPageIds.shoppingCartCurrentAmmount
    );
  }
  get filterSelection(): WebdriverIO.Element {
    return $(InventoryPageId.filterSelection);
  }
  public clickedAddToCartButtonText: string = inventoryPageIds.clickedAddToCartButtonText;

  async notLogedErrorText(): Promise<string> {
    const text = await (await this.wrongCredentialsErrorText).getText();
    return await text;
  }

  async getProductFromCatalog(id: number) {
    // const uniqueId = $(`a#item_${id}_title_link div`);
    const uniqueId = $(InventoryPageId.uniqueItemId(id));
    const parent = (
      await (await uniqueId.parentElement()).parentElement()
    ).parentElement();
    let product: Product = {
      name: await (await parent).$(this.catalogItemTitle).getText(),
      description: (await parent).$(this.catalogItemDescription).getText(),
      price: (await parent).$(this.catalogItemPrice).getText(),
      button: (await parent).$(await this.addToCartButton),
    };
    return product;
  }
  async clickAddToCartButton(calatogItem: Product) {
    calatogItem.button.click();
  }
  async clickRemoveFromCartButton(calatogItem: Product) {
    this.removeFromCartButton.click();
  }
  async selectFilterBy(selectBy: string, optionValue: string) {
    await (await this.filterSelection).selectByAttribute(selectBy, optionValue);
  }
  async getAllProductsNamesAndPrices() {
    const arrayOfProducts = await this.allProducts;
    let arrayOfProductNames = [];
    for (let i = 0; i < arrayOfProducts.length; i++) {
      const fullPrice = await (
        await arrayOfProducts[i].$(
          InventoryPageId.inventoryItemPrice
        )
      ).getText();
      const product: { name: string; price: number } = {
        name: await arrayOfProducts[i]
          .$(
            InventoryPageId.inventoryItemName
          )
          .getText(),
        price: parseFloat(fullPrice.substring(1)),
      };
      // arrayOfProductNames.push(await arrayOfProducts[i].$('div.inventory_item_description div.inventory_item_label a div.inventory_item_name').getText())
      arrayOfProductNames.push(product);
    }

    return arrayOfProductNames;
  }
  open() {
    return super.open("inventory.html");
  }
}

export default new InventoryPage();
