import { expect } from "@playwright/test";
import { test } from "../fixtures/fixturePages";
import {
  validBoundaryValuesFirstInput,
  validBoundaryValuesSecondInput,
  validFormCases,
  invalidValue,
  invalidValueSecondInput,
  invalidFirstValueFormCases,
  invalidSecondInputCases,
} from "../test-data/test-data";

test.describe("positive", () => {
  test.beforeEach(async ({ javascriptFormPage }) => {
    await javascriptFormPage.open();
  });

  for (const { value, note } of validBoundaryValuesFirstInput) {
    test(
      `should accept valid value in the first field after it loses focus (${note})`,
      { tag: ["@javascriptForm", "@regression"] },
      async ({ javascriptFormPage }) => {
        await javascriptFormPage.javascriptForm.fillFirstInput(value);
        await javascriptFormPage.javascriptForm.getFirstInput().blur();
        await expect(
          javascriptFormPage.javascriptForm.getFirstError(),
        ).toBeHidden();
        await expect(
          javascriptFormPage.javascriptForm.getFirstInput(),
        ).toHaveValue(value);
      },
    );
  }

  for (const { value, note } of validBoundaryValuesSecondInput) {
    test(
      `should accept valid value in the second field after it loses focus (${note})`,
      { tag: ["@javascriptForm", "@regression"] },
      async ({ javascriptFormPage }) => {
        await javascriptFormPage.javascriptForm.fillSecondInput(value);
        await javascriptFormPage.javascriptForm.getSecondInput().blur();
        await expect(
          javascriptFormPage.javascriptForm.getSecondError(),
        ).toBeHidden();
        await expect(
          javascriptFormPage.javascriptForm.getSecondInput(),
        ).toHaveValue(value);
      },
    );
  }
  for (const { first, second, note } of validFormCases) {
    test(
      `should show success message when form is submitted with valid values (${note})`,
      { tag: ["@javascriptForm", "@smoke"] },
      async ({ javascriptFormPage }) => {
        await javascriptFormPage.javascriptForm.fillFirstInput(first);
        await javascriptFormPage.javascriptForm.fillSecondInput(second);
        await javascriptFormPage.javascriptForm.clickSubmitButton();

        await expect(
          javascriptFormPage.javascriptForm.getSuccessMessage(),
        ).toBeVisible();
      },
    );
  }

  test.fixme(
    `should submit form with valid values using keyboard only`,
    { tag: ["@javascriptForm", "@regression"] },
    async ({ javascriptFormPage }) => {
      await javascriptFormPage.javascriptForm.getFirstInput().focus();
      await expect(
        javascriptFormPage.javascriptForm.getFirstInput(),
      ).toBeFocused();
    },
  );

  for (const { first, second, note } of validFormCases) {
    test(
      `should show submitted values in results after form is submitted with valid values (${note})`,
      { tag: ["@javascriptForm", "@smoke"] },
      async ({ javascriptFormPage }) => {
        await javascriptFormPage.javascriptForm.fillFirstInput(first);
        await javascriptFormPage.javascriptForm.fillSecondInput(second);
        await javascriptFormPage.javascriptForm.clickSubmitButton();

        await expect(
          javascriptFormPage.javascriptForm.getFirstResult(),
        ).toHaveText(first);
        await expect(
          javascriptFormPage.javascriptForm.getSecondResult(),
        ).toHaveText(second);
      },
    );
  }
});

test.describe("negative", () => {
  test.beforeEach(async ({ javascriptFormPage }) => {
    await javascriptFormPage.open();
  });

  for (const { value, note, knownIssue } of invalidValue) {
    test(
      `should show error when invalid value is entered in the first field and it loses focus (${note})`,
      {
        tag: [
          "@javascriptForm",
          "@regression",
          ...(knownIssue ? ["@known-issue"] : []),
        ],
      },
      async ({ javascriptFormPage }) => {
        test.fail(
          !!knownIssue,
          "Known issue: does not show validation error for this value",
        );

        await javascriptFormPage.javascriptForm.fillFirstInput(value);
        await javascriptFormPage.javascriptForm.getFirstInput().blur();
        await expect(
          javascriptFormPage.javascriptForm.getFirstError(),
        ).toBeVisible();
      },
    );
  }

  for (const { value, note, knownIssue } of invalidValueSecondInput) {
    test(
      `should show error when invalid value is entered in the second field and it loses focus (${note})`,
      {
        tag: [
          "@javascriptForm",
          "@regression",
          ...(knownIssue ? ["@known-issue"] : []),
        ],
      },
      async ({ javascriptFormPage }) => {
        test.fail(
          !!knownIssue,
          "Known issue: does not show validation error for this value",
        );
        await javascriptFormPage.javascriptForm.fillSecondInput(value);
        await javascriptFormPage.javascriptForm.getSecondInput().blur();
        await expect(
          javascriptFormPage.javascriptForm.getSecondError(),
        ).toBeVisible();
        await expect(
          javascriptFormPage.javascriptForm.getSecondInput(),
        ).toHaveValue(value);
      },
    );
  }

  for (const {
    first,
    second,
    note,
    knownIssue,
  } of invalidFirstValueFormCases) {
    test(
      `should show error and no success message when form is submitted with invalid first value (${note})`,
      {
        tag: [
          "@javascriptForm",
          "@regression",
          ...(knownIssue ? ["@known-issue"] : []),
        ],
      },
      async ({ javascriptFormPage }) => {
        test.fail(
          !!knownIssue,
          "Known issue: does not show validation error for this value",
        );

        await javascriptFormPage.javascriptForm.fillFirstInput(first);
        await javascriptFormPage.javascriptForm.fillSecondInput(second);
        await javascriptFormPage.javascriptForm.clickSubmitButton();

        await expect(
          javascriptFormPage.javascriptForm.getFirstError(),
        ).toBeVisible();
        await expect(
          javascriptFormPage.javascriptForm.getSuccessMessage(),
        ).toBeHidden();
      },
    );
  }

  for (const { first, second, note, knownIssue } of invalidSecondInputCases) {
    test(
      `should show error and no success message when form is submitted with invalid second value (${note})`,
      {
        tag: [
          "@javascriptForm",
          "@regression",
          ...(knownIssue ? ["@known-issue"] : []),
        ],
      },
      async ({ javascriptFormPage }) => {
        test.fail(
          !!knownIssue,
          "Known issue: site does not show validation error for this value",
        );
        await javascriptFormPage.javascriptForm.fillFirstInput(first);
        await javascriptFormPage.javascriptForm.fillSecondInput(second);
        await javascriptFormPage.javascriptForm.clickSubmitButton();

        await expect(
          javascriptFormPage.javascriptForm.getSecondError(),
        ).toBeVisible();
        await expect(
          javascriptFormPage.javascriptForm.getSuccessMessage(),
        ).toBeHidden();
      },
    );
  }
});

test.describe("network", () => {
  test.beforeEach(async ({ javascriptFormPage }) => {
    await javascriptFormPage.open();
  });

  for (const { first, second, note } of validFormCases) {
    test(
      `should send entered values in request body when form is submitted (${note})`,
      { tag: ["@javascriptForm", "@smoke"] },
      async ({ javascriptFormPage }) => {
        await javascriptFormPage.javascriptForm.fillFirstInput(first);
        await javascriptFormPage.javascriptForm.fillSecondInput(second);
        const [response] = await Promise.all([
          javascriptFormPage.javascriptForm.waitForSubmitApiRequest(),
          javascriptFormPage.javascriptForm.clickSubmitButton(),
        ]);
        const postData = new URLSearchParams(response.request().postData()!);
        expect(postData.get("value1")).toBe(first);
        expect(postData.get("value2")).toBe(second);
      },
    );
  }
});
