import {  Page } from "@playwright/test";

export class BasicAuthComponent {
  constructor(private page: Page) {
    this.page = page;
  }

  getBasicAuthProtectedLink() {
    return this.page.getByRole("link", { name: "Basic Auth Protected Page" });
  }

  async clickBasicAuthProtectedLink() {
    await this.getBasicAuthProtectedLink().click();
  }
  getAuthenticatedMessage() {
    return this.page.getByText("You were Authenticated");
  }

  getReset() {
    return this.page.locator("#reset-basic-auth");
  }

  getReturn() {
    return this.page.getByRole("link", {
      name: "Return to the Basic Auth page",
    });
  }

  async clickReset() {
    await this.getReset().click();
  }

  async clickReturn() {
    await this.getReturn().click();
  }

  getResetSuccess() {
    return this.page.locator("#authentication-reset");
  }

  async waitForAuthResponse() {
    return this.page.waitForResponse((response) => {
      return response.url().includes("/pages/auth/basic-auth/");
    });
  }

  getNotAuthenticated() {
    return this.page.getByText("You were Not Authenticated");
  }


  
}
