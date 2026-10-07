import { Page } from "@playwright/test";
import { iFrameComponent } from "../components/iFrameComponent";

export class ExternalSitePage {
  embeddedSite: iFrameComponent;

  constructor(private page: Page) {
    this.embeddedSite = new iFrameComponent(page.locator("#contentFrame"));
  }

  async open() {
    await this.page.goto(
      "https://testpages.eviltester.com/pages/embedded-pages/external-sites/",
    );
  }

  private getWebsite() {
    return this.page.locator("#urlSelect");
  }

  async selectWebsite(website: string) {
    this.getWebsite().selectOption(website);
  }

  async waitForIFrameResponse(website: string) {
    return this.page.waitForResponse(
      (response) =>
        response.request().isNavigationRequest() &&
        response.url().includes(website) &&
        !(response.status() >= 300 && response.status() < 400),
    );
  }
}
