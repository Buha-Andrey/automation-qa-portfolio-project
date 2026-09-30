import { Page } from "@playwright/test";

export class AjaxFormComponent {
  constructor(private page: Page) {
    this.page = page;
  }

  getCategoryOptions = () => this.page.locator(`#combo1 option`);
  getLanguageOptions = () => this.page.locator(`#combo2 option`);
  getCategory = () => this.page.locator(`#combo1`);
  getLanguage = () => this.page.locator(`#combo2`);
  getButton = () => this.page.getByRole("button", { name: "Code In It" });
  getSuccessMessage = () => this.page.locator("div.explanation  p");
  getSubmittedCategory = () => this.page.locator("#_valueid");
  getSubmittedLanguage = () => this.page.locator("#_valuelanguage_id");
  getSubmittedButton = () => this.page.locator("#_valuesubmitbutton");
  getClearButton = () => this.page.locator("#clear-rendered-form-results");
  getAjaxLoader = () => this.page.locator("#ajaxBusy");

  async clickButton() {
    await this.getButton().click();
  }
  async selectCategory(category: string) {
    await this.getCategory().selectOption(category);
  }
  async selectLanguage(language: string) {
    await this.getLanguage().selectOption(language);
  }
  async clickClearButton() {
    await this.getClearButton().click();
  }
  async waitTillAjaxLoaderIsHidden() {
    await this.getAjaxLoader().waitFor({ state: "hidden" });
  }

  async waitForChangeCategoryApiResponse(value: string) {
    return this.page.waitForResponse((response) => {
      const url = new URL(response.url());
      return (
        response.url().includes("/pages/forms/ajax/api/ajaxselect") &&
        response.ok() === true &&
        url.searchParams.get("id") === value
      );
    });
  }

  async waitForSubmitApiResponse() {
    return this.page.waitForResponse((response) => {
      return (
        response.url().includes("/pages/forms/ajax/submit") &&
        response.ok() === true
      );
    });
  }
}
