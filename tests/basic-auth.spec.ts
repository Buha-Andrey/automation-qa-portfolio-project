import { expect } from "@playwright/test";
import { test } from "../fixtures/fixturePages";
import { basicAuthInvalidCred } from "../test-data/test-data";

test.describe("positive ", () => {
  test.beforeEach(async ({ basicAuthPage }) => {
    await basicAuthPage.open();
  });

  test.use({
    httpCredentials: { username: "authorized", password: "password001" },
  });

  test(
    `should authenticate and get success page when valid credentials are entered `,
    { tag: ["@test"] },
    async ({ basicAuthPage }) => {
      await basicAuthPage.basicAuth.clickBasicAuthProtectedLink();

      await expect(
        basicAuthPage.basicAuth.getAuthenticatedMessage(),
      ).toBeVisible();
    },
  );

  test(
    `should open basicAuthPage after clicking "Return to the Basic Auth page" button`,
    { tag: ["@test"] },
    async ({ basicAuthPage }) => {
      await basicAuthPage.basicAuth.clickBasicAuthProtectedLink();
      await basicAuthPage.basicAuth.clickReturn();

      await expect(
        basicAuthPage.basicAuth.getBasicAuthProtectedLink(),
      ).toBeVisible();
    },
  );

  test(
    `should delete Basic Authentication Header after clicking "Reset Basic Auth" button`,
    { tag: ["@test"] },
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

test.describe("negative", () => {
  test.beforeEach(async ({ basicAuthPage }) => {
    await basicAuthPage.open();
  });
  for (const { username, password } of basicAuthInvalidCred) {
    test.use({
      httpCredentials: { username: username, password: password },
    });

    test(
      `should show "Invalid Credentials" page when invalid credentials are entered (username: ${username}, password: ${password})`,
      { tag: ["@test"] },
      async ({ basicAuthPage }) => {
        await basicAuthPage.basicAuth.clickBasicAuthProtectedLink();

        await expect(
          basicAuthPage.basicAuth.getNotAuthenticated(),
        ).toBeVisible();
      },
    );
  }
});

test.describe("api", () => {
  test(
    `returns 200 with valid credentials`,
    { tag: ["@test"] },
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
  test(
    `should return 401 when authenticate request is sent with invalid/missing Basic Authentication Header`,
    { tag: ["@test"] },
    async ({ basicAuthApi }) => {
      const response = await basicAuthApi.getInvalidBasicAuthorization();
      expect(response.status()).toBe(401);
      expect(await response.json()).toMatchObject({
        authenticated: false,
        reason: "The Authorization header was not Basic authentication",
      });
    },
  );
  test.fail(
    `should return 400 when authenticate request is sent with invalid/missing Accept header`,
    { tag: ["@test"] },
    async ({ basicAuthApi }) => {
      const response = await basicAuthApi.getInvalidAcceptHeader();
      expect(response.status()).toBe(401);
    },
  );
});
