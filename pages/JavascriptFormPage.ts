import { Page } from "@playwright/test";
import { JavascriptFormComponent } from "../components/JavascriptFormComponent";

export class JavascriptFormPage {
  javascriptForm: JavascriptFormComponent;

  constructor(private page: Page) {
    this.page = page;
    this.javascriptForm = new JavascriptFormComponent(this.page);
  }

  async open() {
    await this.page.goto(
      "https://testpages.eviltester.com/pages/forms/javascript-validation/",
    );
  }
}
