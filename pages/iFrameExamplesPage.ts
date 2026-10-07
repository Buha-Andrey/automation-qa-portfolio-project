import { Page } from "@playwright/test";
import { iFrameComponent } from "../components/iFrameComponent";

export class iFrameExamplesPage {
  iFrameList: iFrameComponent;
  iFrameNumber: iFrameComponent;

  constructor(private page: Page) {
    this.page = page;
    this.iFrameList = new iFrameComponent(
      page.locator("#iframe-container1 iframe"),
    );

    this.iFrameNumber = new iFrameComponent(
      page.locator("#iframe-container2 iframe"),
    );
  }

  async open() {
    await this.page.goto(
      "https://testpages.eviltester.com/pages/embedded-pages/iframes/",
    );
  }

  getListTitle() {
    return this.iFrameList.inner("h1");
  }
  getListItem(idNumber: string) {
    return this.iFrameList.inner(`ul li#iframe${idNumber}`);
  }

  getIncrementNumberTitle() {
    return this.iFrameNumber.inner("h1");
  }

  getTotalValueInput() {
    return this.iFrameNumber.inner("#numField");
  }
  getAmountInput() {
    return this.iFrameNumber.inner("#incField");
  }
  getAddButton() {
    return this.iFrameNumber.inner("#incBtn");
  }

  async fillAmountInput(value: string) {
    await this.getAmountInput().fill(value);
  }
  async clickAddButton() {
    await this.getAddButton().click();
  }
}
