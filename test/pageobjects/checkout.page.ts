import Page from "./page";
import CheckoutPageIds from "./PageObjecrsId/checkoutPageIds";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class InventoryPage extends Page {
 
    get checkOutButton () {return $(CheckoutPageIds.checkOutButton)}
    get inCartItemName(){return $(CheckoutPageIds.itemCartName)};
    get inCartAllItemsNames() {return ($$(CheckoutPageIds.itemCartName))};
  open() {
    return super.open("cart.html");
  }
}

export default new InventoryPage();
