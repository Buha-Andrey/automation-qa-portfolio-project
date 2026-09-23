import { Page } from "@playwright/test";

class SelectRoleComponent {
  constructor(private page: Page) {
    this.page = page;
  }

  private getRoleRadioButton = (role: string) => this.page.locator(`#${role}`);
  // private getManagerRadioButton = () => this.page.locator("#anager");
  // private getProgrammerRadioButton = () => this.page.locator("#programmer");
  // private getTesterRadioButton = () => this.page.locator("#tester");
  // private getAllRadioButton = () => this.page.locator("#all");
  getSubmitButton = () => this.page.locator("#submitBtn");
  getRoleDescription = () => this.page.locator(".role-description");
  getSpinner = () => this.page.locator("#spinner");
  getSuccessMessage = () => this.page.locator("#message");

  async hoverRoleRadioButton(role: string) {
    await this.getRoleRadioButton(role).hover();
  }

  async clickRoleRadioButton(role: string) {
    await this.getRoleRadioButton(role).click();
  }

  async clickSubmitButton() {
    await this.getSubmitButton().click();
  }
  async waitForSpinnerToBeHidden() {
    await this.getSpinner().waitFor({ state: "hidden" });
  }

  async waitForSubmitApiResponse() {
    return this.page.waitForResponse(
      (response) =>
        response.url().includes("/internalapi/choose-a-role") &&
        response.request().method() === "POST",
    );
  }
}
export { SelectRoleComponent };
