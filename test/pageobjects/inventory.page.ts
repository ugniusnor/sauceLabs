import Page from "./page";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class InventoryPage extends Page {
  /**
   * define selectors using getter methods
   */
  get wrongCredentialsErrorText(): WebdriverIO.Element {
    return $('h3[data-test="error"]');
  }
  get catalogItemTitle(): string {
    return (`div.inventory_item_label div.inventory_item_name`);
  }
  get catalogItemDescription(): string {
    return (`div.inventory_item_label div.inventory_item_desc`);
  }
  get productBlock():WebdriverIO.Element {return $( 'div .inventory_item_desc')}

  get addToCartButton():WebdriverIO.Element {return $('button[data-test="add-to-cart-sauce-labs-backpack"]')}
  get removeFromCartButton():WebdriverIO.Element {return $('button[data-test="remove-sauce-labs-backpack"]')};
  public expectedNotLogedErrorText: string =
    "Epic sadface: You can only access '/inventory.html' when you are logged in.";
  public clickedAddToCartButtonText:string = "Remove";
  get catalogItemPrice():string {
    return 'div.pricebar div.inventory_item_price'
  }


  async notLogedErrorText(): Promise<string> {
    const text = await (await this.wrongCredentialsErrorText).getText();
    return await text;
  }

  async getProductFromCatalog(id:number) {
    const uniqueId = $( `a#item_${id}_title_link div`);
    const parent = (await (await uniqueId.parentElement()).parentElement()).parentElement();
    let product:Product = {
        name:await (await parent).$(this.catalogItemTitle).getText(),
        description:(await parent).$(this.catalogItemDescription).getText(),
        price:(await parent).$(this.catalogItemPrice).getText(),
        button:(await this.addToCartButton)
    };
    return product;
    
  }
  async clickAddToCartButton (calatogItem:Product) {
   calatogItem.button.click()
  }
  open() {
    return super.open("inventory.html");
  }
}

export default new InventoryPage();
