import { Page } from "@playwright/test";
import { iFrameComponent } from "../components/iFrameComponent";

export class ExternalContentPage {
  youtubeFrame: iFrameComponent;
    audioFrame: iFrameComponent;

  constructor(private page: Page) {
    this.youtubeFrame = new iFrameComponent(page.locator('iframe[title="YouTube video player"]'));
    this.audioFrame = new iFrameComponent(page.locator("div.podcastdotco-wrapper > iframe"));

  }

  async open() {
    await this.page.goto(
      "https://testpages.eviltester.com/pages/embedded-pages/external-content/",
    );
  }
}
