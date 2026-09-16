import { Page } from "@playwright/test";
import { TextBoxComponent } from "../components/TextBoxComponent";
import { LeftNavAccordionComponent } from "../components/LeftNavAccordionComponent";

class TextBoxPage {
  textBox: TextBoxComponent;
  LeftNavAccordion: LeftNavAccordionComponent;

  constructor(private page: Page) {
    this.page = page;
    this.textBox = new TextBoxComponent(this.page);
    this.LeftNavAccordion = new LeftNavAccordionComponent(this.page);
  }

  async open() {
    await this.page.goto("https://demoqa.com/text-box");
  }
}
export { TextBoxPage };
