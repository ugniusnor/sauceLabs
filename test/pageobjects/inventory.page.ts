import Page from "./page";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class InventoryPage extends Page {
  /**
   * define selectors using getter methods
   */
   get wrongCredentialsErrorText():WebdriverIO.Element  {
    return $('h3[data-test="error"]');
  }get catalogItemTitle():WebdriverIO.Element {return $(`a`)}
  public  expectedNotLogedErrorText:string ="Epic sadface: You can only access '/inventory.html' when you are logged in."

  async login(username: string, password: string) {
   
  }
  async notLogedErrorText():Promise<string> {
    const text = await (await this.wrongCredentialsErrorText).getText();
    return await text;
  }
async getCatalogItemTitle(id:number):Promise<string>{
    const itemName:WebdriverIO.Element=  await $(`a#item_${id}_title_link div`)
    return itemName.getText();
    
}   
  open() {
    return super.open("inventory.html");
  }
}

export default new InventoryPage();
