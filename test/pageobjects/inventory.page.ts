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
  get catalogItemTitle(): WebdriverIO.Element {
    return $(`a`);
  }
  get productBlock():WebdriverIO.Element {return $( 'div .inventory_item_desc')}

  public expectedNotLogedErrorText: string =
    "Epic sadface: You can only access '/inventory.html' when you are logged in.";

  async login(username: string, password: string) {}
  async notLogedErrorText(): Promise<string> {
    const text = await (await this.wrongCredentialsErrorText).getText();
    return await text;
  }

  async getProductFromCatalog(id:number) {
    const uniqueId = $( `a#item_${id}_title_link div`);
    const parent = (await uniqueId.parentElement()).parentElement();
    let product:Product = {
        name:await (await parent).$(`div.inventory_item_label div.inventory_item_name`).getText(),
        description:(await parent).$('div.inventory_item_label div.inventory_item_desc').getText()
    };
    return product;
    
  }

  open() {
    return super.open("inventory.html");
  }
}

export default new InventoryPage();
