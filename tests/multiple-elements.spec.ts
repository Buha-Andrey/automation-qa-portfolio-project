import { expect } from "@playwright/test";
import { roleTestData } from "../test-data/test-data";
import { test } from "../fixtures/fixturePages";

test.describe("positive", () => {
  test.beforeEach(async ({ multipleElementsPage }) => {
    await multipleElementsPage.open();
  });

  for (const { role } of roleTestData) {
    test(
      `should show success message and hide spinner after Submit with selected role (${role})`,
      { tag: ["@multiElements", "@smoke"] },
      async ({ multipleElementsPage }) => {
        await multipleElementsPage.SelectRole.clickRoleRadioButton(role);
        await multipleElementsPage.SelectRole.clickSubmitButton();
        await multipleElementsPage.SelectRole.waitForSpinnerToBeHidden();

        await expect(multipleElementsPage.SelectRole.getSpinner()).toBeHidden();
        await expect(
          multipleElementsPage.SelectRole.getSuccessMessage(),
        ).toBeVisible();
        await expect(
          multipleElementsPage.SelectRole.getSuccessMessage(),
        ).toHaveText(`Successfully submitted: ${role}`);
      },
    );
  }

  for (const { role, description } of roleTestData) {
    test(
      `should show role description when hovering over role button (${role})`,
      { tag: ["@multiElements", "@regression"] },
      async ({ multipleElementsPage }) => {
        // const multipleElementsPage = new MultipleElementsPage(page);
        await multipleElementsPage.SelectRole.hoverRoleRadioButton(role);

        await expect(
          multipleElementsPage.SelectRole.getRoleDescription(),
        ).toHaveText(description);
      },
    );
  }

  for (const { role } of roleTestData) {
    test(
      `should show spinner while submit request is in progress (${role})`,
      { tag: ["@multiElements", "@regression"] },
      async ({ multipleElementsPage }) => {
        // const multipleElementsPage = new MultipleElementsPage(page);

        await multipleElementsPage.SelectRole.clickRoleRadioButton("tester");
        await multipleElementsPage.SelectRole.clickSubmitButton();

        await expect(
          multipleElementsPage.SelectRole.getSpinner(),
        ).toBeVisible();
      },
    );
  }
});

test.describe("negative", () => {
  test.beforeEach(async ({ multipleElementsPage }) => {
    await multipleElementsPage.open();
  });

  test(
    `should keep Submit button disabled when no role is selected`,
    { tag: ["@multiElements", "@regression"] },
    async ({ multipleElementsPage }) => {
      // const multipleElementsPage = new MultipleElementsPage(page);
      await expect(
        multipleElementsPage.SelectRole.getSubmitButton(),
      ).toBeDisabled();
    },
  );

  for (const { role } of roleTestData) {
    test(
      `should disable Submit button after role is submitted (${role})`,
      { tag: ["@multiElements", "@regression"] },
      async ({ multipleElementsPage }) => {
        // const multipleElementsPage = new MultipleElementsPage(page);
        await multipleElementsPage.SelectRole.clickRoleRadioButton(role);
        await multipleElementsPage.SelectRole.clickSubmitButton();
        await multipleElementsPage.SelectRole.waitForSpinnerToBeHidden();

        await expect(
          multipleElementsPage.SelectRole.getSubmitButton(),
        ).toBeDisabled();
      },
    );
  }

  test.fail(
    `should show result of the first submission when role is changed`,
    { tag: ["@multiElements", "@known-issue", "@regression"] },
    async ({ multipleElementsPage }) => {
      // submitted 2 requests after clicking SubmitButton each time

      await multipleElementsPage.SelectRole.clickRoleRadioButton(
        roleTestData[0].role,
      );
      await multipleElementsPage.SelectRole.clickSubmitButton();
      await multipleElementsPage.SelectRole.clickRoleRadioButton(
        roleTestData[1].role,
      );
      await multipleElementsPage.SelectRole.clickSubmitButton();
      await multipleElementsPage.SelectRole.waitForSpinnerToBeHidden();

      await expect(
        multipleElementsPage.SelectRole.getSuccessMessage(),
      ).toHaveText(`Successfully submitted: ${roleTestData[0].role}`);
    },
  );
});

test.describe("network", () => {
  test.beforeEach(async ({ multipleElementsPage }) => {
    await multipleElementsPage.open();
  });

  for (const { role } of roleTestData) {
    test(
      `should send POST request to /internalapi/choose-a-role on submit for each role - ${role}`,
      { tag: ["@multiElements", "@smoke"] },
      async ({ multipleElementsPage }) => {
        // const multipleElementsPage = new MultipleElementsPage(page);
        await multipleElementsPage.SelectRole.clickRoleRadioButton(role);
        const [response] = await Promise.all([
          multipleElementsPage.SelectRole.waitForSubmitApiResponse(),
          multipleElementsPage.SelectRole.clickSubmitButton(),
        ]);

        expect(response.status()).toBe(200);
        expect(response.url()).toContain("/internalapi/choose-a-role");
        expect(response.request().method()).toBe("POST");
      },
    );
  }

  for (const { role } of roleTestData) {
    test(
      `should send JSON body with selected role and "application/json" content-type when role is submitted (${role})`,
      { tag: ["@multiElements", "@regression"] },
      async ({ multipleElementsPage }) => {
        // const multipleElementsPage = new MultipleElementsPage(page);
        await multipleElementsPage.SelectRole.clickRoleRadioButton(role);
        const [response] = await Promise.all([
          multipleElementsPage.SelectRole.waitForSubmitApiResponse(),
          multipleElementsPage.SelectRole.clickSubmitButton(),
        ]);

        expect(response.request().headers()["content-type"]).toBe(
          "application/json",
        );
        expect(response.request().postDataJSON()).toEqual({ role: role });
      },
    );
  }

  for (const { role, expectedResponseRoleText } of roleTestData) {
    test(
      `should return response body matching the role shown in the success message - ${role}`,
      { tag: ["@multiElements", "@regression"] },
      async ({ multipleElementsPage }) => {
        // const multipleElementsPage = new MultipleElementsPage(page);
        await multipleElementsPage.SelectRole.clickRoleRadioButton(role);
        const [response] = await Promise.all([
          multipleElementsPage.SelectRole.waitForSubmitApiResponse(),
          multipleElementsPage.SelectRole.clickSubmitButton(),
        ]);

        expect(response.headers()["content-type"]).toContain("text/html");
        expect(await response.text()).toContain(
          `good luck in your role as ${expectedResponseRoleText}`,
        );
      },
    );
  }
});
