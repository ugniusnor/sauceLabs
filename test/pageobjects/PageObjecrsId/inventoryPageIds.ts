class InventoryPageId {
  public wrongCredentialsText: string = 'h3[data-test="error"]';
  public catalogItemTitle: string =
    "div.inventory_item_label div.inventory_item_name";
  public catalogItemDescription: string =
    "div.inventory_item_label div.inventory_item_desc";
  public productBlock: string = "div .inventory_item_desc";
  public allProducts: string = "div.inventory_item";
  public addToCartButton: string =
    "div.pricebar button.btn.btn_primary.btn_small.btn_inventory";
  public removeFromCartButton: string =
    "div.pricebar button.btn.btn_secondary.btn_small.btn_inventory";
  public expectedNotLogedErrorText: string =
    "Epic sadface: You can only access '/inventory.html' when you are logged in.";
  public catalogItemPrice: string = "div.pricebar div.inventory_item_price";
  public shoppingCartCurrentAmmount: string =
    "div#shopping_cart_container a.shopping_cart_link span.shopping_cart_badge";
  public filterSelection: string = 'select[data-test="product_sort_container"]';
  public clickedAddToCartButtonText: string = "Remove";
  public inventoryItemName: string =
    "div.inventory_item_description div.inventory_item_label a div.inventory_item_name";
  public inventoryItemPrice: string =
    "div.inventory_item_description div.pricebar div.inventory_item_price";
  public uniqueItemId = (id: number): string => {
    return `a#item_${id}_title_link div`;
  };
}
export default new InventoryPageId();
