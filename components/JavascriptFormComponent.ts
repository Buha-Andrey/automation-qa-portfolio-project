import { Page } from "@playwright/test";

export class JavascriptFormComponent {
  constructor(private page: Page) {
    this.page = page;
  }

  getFirstInput() {
    return this.page.locator("#lteq30a");
  }
  getSecondInput() {
    return this.page.locator("#lteq30b");
  }
  getSubmitButton() {
    return this.page.getByRole("button", { name: "Submit Value" });
  }
  getFirstError() {
    return this.page.locator("#lteq30aError");
  }
  getSecondError() {
    return this.page.locator("#lteq30bError");
  }
  getSuccessMessage() {
    return this.page.locator(".explanation p");
  }
  getFirstResult() {
    return this.page.locator("#_valuevalue1");
  }
  getSecondResult() {
    return this.page.locator("#_valuevalue2");
  }

  async clickSubmitButton() {
    await this.getSubmitButton().click();
  }
  async fillFirstInput(value: string) {
    await this.getFirstInput().fill(value);
  }
  async fillSecondInput(value: string) {
    await this.getSecondInput().fill(value);
  }

  async waitForSubmitApiRequest() {
    return this.page.waitForResponse(
      (response) =>
        response.url().includes("/pages/forms/javascript-validation/submit") &&
        response.status() === 200,
    );
  }

  // async waitForSubmitApiResponse() {
  //   return this.page.waitForResponse((response) => {
  //     return (
  //       response.url().includes("/pages/forms/javascript-validation/submit") &&
  //       response.ok() === true
  //     );
  //   });
  // }

  // async waitForSubmitApiResponse() {
  //   return this.page.waitForResponse((response) => response.ok() === true);
  // }
}
