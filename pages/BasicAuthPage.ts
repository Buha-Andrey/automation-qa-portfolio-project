import { Page } from "@playwright/test";
import { BasicAuthComponent } from "../components/BasicAuthComponent";

export class BasicAuthPage {
  basicAuth: BasicAuthComponent;

  constructor(private page: Page) {
    this.page = page;
    this.basicAuth = new BasicAuthComponent(this.page);
  }

  async open() {
    await this.page.goto(
      "https://testpages.eviltester.com/pages/auth/basic-auth/",
    );
  }
}
