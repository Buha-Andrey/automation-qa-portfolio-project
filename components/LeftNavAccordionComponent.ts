import { Page } from "@playwright/test";

class LeftNavAccordionComponent {
  constructor(private page: Page) {
    this.page = page;
  }

  private getElementsDropdown() {
    return this.page.getByText("Elements");
  }
  private getTextBoxItem() {
    return this.page
      .locator("div.element-group")
      .filter({ has: this.page.getByText("Elements") })
      .locator("#item-0");
  }
  private getCheckBoxItem() {
    return this.page
      .locator("div.element-group")
      .filter({ has: this.page.getByText("Elements") })
      .locator("#item-1");
  }
  private getRadioButtonItem() {
    return this.page
      .locator("div.element-group")
      .filter({ has: this.page.getByText("Elements") })
      .locator("#item-2");
  }
  private getWebTablesItem() {
    return this.page
      .locator("div.element-group")
      .filter({ has: this.page.getByText("Elements") })
      .locator("#item-3");
  }
  private getButtonsItem() {
    return this.page
      .locator("div.element-group")
      .filter({ has: this.page.getByText("Elements") })
      .locator("#item-4");
  }
  private getLinksItem() {
    return this.page
      .locator("div.element-group")
      .filter({ has: this.page.getByText("Elements") })
      .locator("#item-5");
  }
  private getBrokenLinksImagesItem() {
    return this.page
      .locator("div.element-group")
      .filter({ has: this.page.getByText("Elements") })
      .locator("#item-6");
  }
  private getUploadAndDownloadItem() {
    return this.page
      .locator("div.element-group")
      .filter({ has: this.page.getByText("Elements") })
      .locator("#item-7");
  }
  private getDynamicPropertiesItem() {
    return this.page
      .locator("div.element-group")
      .filter({ has: this.page.getByText("Elements") })
      .locator("#item-8");
  }

  async openElementsDropdown() {
    this.getElementsDropdown().click();
  }
  async clickTextBoxItem() {
    this.getTextBoxItem().click();
  }
  async clickCheckBoxItem() {
    this.getCheckBoxItem().click();
  }
  async clickRadioButtonItem() {
    this.getRadioButtonItem().click();
  }
  async clickWebTablesItem() {
    this.getWebTablesItem().click();
  }
  async clickButtonsItem() {
    this.getButtonsItem().click();
  }
  async clickLinksItem() {
    this.getLinksItem().click();
  }
  async clickBrokenLinksImagesItem() {
    this.getBrokenLinksImagesItem().click();
  }
  async clickUploadAndDownloadItem() {
    this.getUploadAndDownloadItem().click();
  }
  async clickDynamicPropertiesItem() {
    this.getDynamicPropertiesItem().click();
  }
}
export { LeftNavAccordionComponent };
