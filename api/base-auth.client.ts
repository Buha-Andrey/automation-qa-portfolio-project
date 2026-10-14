import { BaseClient } from "./base.client";

export class BasicAuthApi extends BaseClient {
  private static readonly PATH =
    "https://testpages.eviltester.com/pages/auth/basic-auth/basic-auth-protected.html";

  static basicHeader() {
    return `Basic YXV0aG9yaXplZDpwYXNzd29yZDAwMQ==`;
  }

  async getBasicAuthorization() {
    return this.request.get(BasicAuthApi.PATH, {
      headers: {
        Accept: "application/json",
        Authorization: BasicAuthApi.basicHeader(),
      },
    });
  }

  async getInvalidBasicAuthorization() {
    return this.request.get(BasicAuthApi.PATH, {
      headers: {
        Accept: "application/json",
        Authorization: "invalid Authorization header",
      },
    });
  }

  async getInvalidAcceptHeader() {
    return this.request.get(BasicAuthApi.PATH, {
      headers: {
        Accept: "1",
        Authorization: BasicAuthApi.basicHeader(),
      },
    });
  }
}
