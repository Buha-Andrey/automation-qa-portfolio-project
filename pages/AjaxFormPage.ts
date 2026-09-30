import { Page } from "@playwright/test";
import { AjaxFormComponent } from "../components/AjaxFormComponent";

export class AjaxFormPage {
  AjaxForm: AjaxFormComponent;

  constructor(private page: Page) {
    this.page = page;
    this.AjaxForm = new AjaxFormComponent(this.page);
  }

  async open() {
    await this.page.goto("https://testpages.eviltester.com/pages/forms/ajax/");
  }
}
