import Page from "./page";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
  /**
   * define selectors using getter methods
   */
  get inputUsername() :WebdriverIO.Element {
    return $("input#user-name");
  }
  get inputPassword():WebdriverIO.Element  {
    return $("input#password");
  }
  get btnSubmit():WebdriverIO.Element  {
    return $("input#login-button");
  }
  get errorContainerBpx():WebdriverIO.Element  {
    return $("div .error-message-container error h3");
  }

  get wrongCredentialsErrorText():WebdriverIO.Element  {
    return $('h3[data-test="error"]');
  }
  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to login using username and password
   */
  async login(username: string, password: string) {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.btnSubmit.click();
  }
  async invalidCredentialsText():Promise<string> {
    const text = await (await this.wrongCredentialsErrorText).getText();
    return text;
  }
  /**
   * overwrite specifc options to adapt it to page object
   */
  open() {
    return super.open("");
  }
}

export default new LoginPage();
