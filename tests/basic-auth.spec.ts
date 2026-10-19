import { expect } from "@playwright/test";
import { test } from "../fixtures/fixturePages";
import { basicAuthInvalidCred } from "../test-data/test-data";

test.describe("positive", () => {
  test.beforeEach(async ({ basicAuthPage }) => {
    await basicAuthPage.open();
  });

  test.use({
    httpCredentials: { username: "authorized", password: "password001" },
  });

  test(
    `should show authenticated message when protected page is opened with valid credentials`,
    { tag: ["@basicAuth", "@smoke"] },
    async ({ basicAuthPage }) => {
      await basicAuthPage.basicAuth.clickBasicAuthProtectedLink();

      await expect(
        basicAuthPage.basicAuth.getAuthenticatedMessage(),
      ).toBeVisible();
    },
  );

  test(
    `should return to Basic Auth page when "Return to the Basic Auth page" is clicked`,
    { tag: ["@basicAuth", "@regression"] },
    async ({ basicAuthPage }) => {
      await basicAuthPage.basicAuth.clickBasicAuthProtectedLink();
      await basicAuthPage.basicAuth.clickReturn();

      await expect(
        basicAuthPage.basicAuth.getBasicAuthProtectedLink(),
      ).toBeVisible();
    },
  );

  test(
    `should show reset confirmation and stop sending Authorization header after "Reset Basic Auth" is clicked`,
    { tag: ["@basicAuth", "@regression"] },
    async ({ basicAuthPage }) => {
      await basicAuthPage.basicAuth.clickBasicAuthProtectedLink();
      await basicAuthPage.basicAuth.clickReset();

      await expect(basicAuthPage.basicAuth.getResetSuccess()).toBeVisible();

      const [response] = await Promise.all([
        basicAuthPage.basicAuth.waitForAuthResponse(),
        basicAuthPage.basicAuth.clickReturn(),
      ]);

      expect(
        (await response.request().allHeaders())["authorization"],
      ).toBeUndefined();
    },
  );
});

for (const { username, password } of basicAuthInvalidCred) {
  test.describe("negative", () => {
    test.beforeEach(async ({ basicAuthPage }) => {
      await basicAuthPage.open();
    });

    test.use({
      httpCredentials: { username: username, password: password },
    });

    test(
      `should show "Not authenticated" message when protected page is opened with invalid credentials (${username} / ${password})`,
      { tag: ["@basicAuth", "@regression"] },
      async ({ basicAuthPage }) => {
        await basicAuthPage.basicAuth.clickBasicAuthProtectedLink();

        await expect(
          basicAuthPage.basicAuth.getNotAuthenticated(),
        ).toBeVisible();
      },
    );
  });
}

test.describe("api", () => {
  test(
    `should return 200 and authenticated=true when request has valid Basic Auth header`,
    { tag: ["@basicAuth", "@smoke"] },
    async ({ basicAuthApi }) => {
      const response = await basicAuthApi.getBasicAuthorization();
      expect(response.status()).toBe(200);
      expect(await response.json()).toMatchObject({
        authenticated: true,
        reason:
          "Username and Password in the Basic Auth header were the expected values",
      });
    },
  );

  test.fixme(
    `should return 401 and authenticated=false when Authorization header is invalid or missing`,
    { tag: ["@basicAuth", "@regression", "@fix"] },
    async ({ basicAuthApi }) => {
      const response = await basicAuthApi.getInvalidBasicAuthorization();
      expect(response.status()).toBe(401);
      expect(await response.json()).toMatchObject({
        authenticated: false,
        reason: "The Authorization header was not Basic authentication",
      });
    },
  );
  
  test.fixme(
    `should return 401 when Accept header is invalid or missing`,
    { tag: ["@basicAuth", "@regression", "@fix"] },
    async ({ basicAuthApi }) => {
      const response = await basicAuthApi.getInvalidAcceptHeader();
      expect(response.status()).toBe(401);
    },
  );
});
