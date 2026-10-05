import { Page } from "@playwright/test";
import { AlertsJavascriptComponent } from "../components/AlertsJavascriptComponent";

export class AlertsJavascriptPage {
  AlertsJavascript: AlertsJavascriptComponent;

  constructor(private page: Page) {
    this.page = page;
    this.AlertsJavascript = new AlertsJavascriptComponent(this.page);
  }

  async open() {
    await this.page.goto(
      "https://testpages.eviltester.com/pages/basics/alerts-javascript/",
    );
  }
}
