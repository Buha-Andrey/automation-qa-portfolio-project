import { Dialog, Page } from "@playwright/test";

export class AlertsJavascriptComponent {
  constructor(private page: Page) {
    this.page = page;
  }
  private dialogPromise() {
    this.page.waitForEvent("dialog");
  }
  getShowAlertBoxButton() {
    return this.page.locator("#alertexamples");
  }
  getShowConfirmBoxButton() {
    return this.page.locator("#confirmexample");
  }
  getShowPromptBoxButton() {
    return this.page.locator("#promptexample");
  }
  getAlertExplanationMessage() {
    return this.page.locator("#alertexplanation");
  }
  getConfirmExplanationMessage() {
    return this.page.locator("#confirmexplanation");
  }
  getPromptExplanationMessage() {
    return this.page.locator("#promptexplanation");
  }
  getConfirmReturnMessage() {
    return this.page.locator("#confirmreturn");
  }
  getPromptReturnMessage() {
    return this.page.locator("#promptreturn");
  }

  async clickShowAlertBoxButton() {
    await this.getShowAlertBoxButton().click();
  }
  async clickShowConfirmBoxButton() {
    await this.getShowConfirmBoxButton().click();
  }
  async clickShowPromptBoxButton() {
    await this.getShowPromptBoxButton().click();
  }

  async triggerAlert(): Promise<Dialog> {
    const dialogPromise = this.page.waitForEvent("dialog");
    this.clickShowAlertBoxButton();
    return dialogPromise;
  }

  async triggerConfirm(): Promise<Dialog> {
    const dialogPromise = this.page.waitForEvent("dialog");
    this.clickShowConfirmBoxButton();
    return dialogPromise;
  }

  async triggerPrompt(): Promise<Dialog> {
    const dialogPromise = this.page.waitForEvent("dialog");
    this.clickShowPromptBoxButton();
    return dialogPromise;
  }
}
