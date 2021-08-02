import LoginPage from "../pageobjects/login.page";
import SecurePage from "../pageobjects/secure.page";
import correctCredentials from "../testData/correctCredentials";
import incorectCredentials from "../testData/incorectCredentials";
describe.only("My Login page should provide correct errors with wrong credentials", () => {
  incorectCredentials.forEach(async ({ username, password, expectedError }) => {
    it("Should show correct error with invalid credentials", async () => {
      await LoginPage.open();
      await LoginPage.login(username, password);
      await expect(await LoginPage.invalidCredentialsText()).toBe(
        expectedError
      );
    });
  });
});

describe("Login should work with correct credentials", () => {
  correctCredentials.forEach(async ({ username, password }) => {
    it("Should login with correct credentials", async () => {
      await LoginPage.open();
      await LoginPage.login(username, password);
      await expect(await browser.getUrl()).toBe(
        "https://www.saucedemo.com/inventory.html"
      );
    });
  });
});
