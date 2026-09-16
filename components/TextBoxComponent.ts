import { Page } from "@playwright/test";

class TextBoxComponent {
  constructor(private page: Page) {
    this.page = page;
  }
  getFormTitle() {
    return this.page.locator("//h1");
  }
  getFullNameTitle() {
    return this.page.locator("#userName-label");
  }
  getEmailTitle() {
    return this.page.locator("#userEmail-label");
  }
  getCurrentAddressTitle() {
    return this.page.locator("#currentAddress-label");
  }
  getPermanentAddressTitle() {
    return this.page.locator("#permanentAddress-label");
  }
  getFullNameInput() {
    return this.page.locator("#userName");
  }
  getEmailInput() {
    return this.page.locator("#userEmail");
  }
  getCurrentAddressTextarea() {
    return this.page.locator("textarea#currentAddress");
  }
  getPermanentAddressTextarea() {
    return this.page.locator("textarea#permanentAddress");
  }
  getSubmitButton() {
    return this.page.locator("#submit");
  }
  getSubmittedFullName() {
    return this.page.locator("#name");
  }
  getSubmittedEmail() {
    return this.page.locator("#email");
  }
  getSubmittedCurrentAddress() {
    return this.page.locator("p#currentAddress");
  }
  getSubmittedPermanentAddress() {
    return this.page.locator("p#permanentAddress");
  }

  async fillFullNameInput(name: string) {
    await this.getFullNameInput().fill(name);
  }
  async fillEmailInput(email: string) {
    await this.getEmailInput().fill(email);
  }
  async fillCurrentAddressTextarea(address: string) {
    await this.getCurrentAddressTextarea().fill(address);
  }
  async fillPermanentAddressTextarea(address: string) {
    await this.getPermanentAddressTextarea().fill(address);
  }
  async clickSubmitButton() {
    await this.getSubmitButton().click();
  }
}
export { TextBoxComponent };
