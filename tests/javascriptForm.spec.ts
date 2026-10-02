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
      `should accept valid values in the 1st field after focus lost (${note})`,
      { tag: ["@test"] },
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
      `should accept valid values in the 2st field after focus lost (${note})`,
      { tag: ["@test"] },
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
      `should submit form with valid values ${note}`,
      { tag: ["@test"] },
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
    `should submit form with valid values using keyboard`,
    { tag: ["@test"] },
    async ({ javascriptFormPage }) => {
      await javascriptFormPage.javascriptForm.getFirstInput().focus();
      await expect(
        javascriptFormPage.javascriptForm.getFirstInput(),
      ).toBeFocused();
    },
  );

  for (const { first, second, note } of validFormCases) {
    test(
      `should display results details after submitted form with valid values ${note}`,
      { tag: ["@test"] },
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

  for (const { value, note } of invalidValue) {
    test.skip(
      `should show error after entering invalid values in the 1st field and lost the focus (${note})`,
      { tag: ["@test"] },
      async ({ javascriptFormPage }) => {
        await javascriptFormPage.javascriptForm.fillFirstInput(value);
        await javascriptFormPage.javascriptForm.getFirstInput().blur();
        await expect(
          javascriptFormPage.javascriptForm.getFirstError(),
        ).toBeVisible();
      },
    );
  }

  for (const { value, note } of invalidValueSecondInput) {
    test.skip(
      `should show error after entering invalid values in the 2st field and lost the focus (${note})`,
      { tag: ["@test"] },
      async ({ javascriptFormPage }) => {
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

  for (const { first, second, note } of invalidFirstValueFormCases) {
    test(
      `should show error after submitting form with invalid value in first input (${note})`,
      { tag: ["@test"] },
      async ({ javascriptFormPage }) => {
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

  for (const { first, second, note } of invalidSecondInputCases) {
    test(
      `should show error after submitting form with invalid value in second input (${note})`,
      { tag: ["@test"] },
      async ({ javascriptFormPage }) => {
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

  for (const { first, second, note } of validFormCases)
    test(
      `should create request after submitting the form ${note}`,
      { tag: ["@test"] },
      async ({ javascriptFormPage }) => {
        await javascriptFormPage.javascriptForm.fillFirstInput(first);
        await javascriptFormPage.javascriptForm.fillSecondInput(second);
        await Promise.all([
          javascriptFormPage.javascriptForm.waitForSubmitApiRequest(),
          javascriptFormPage.javascriptForm.clickSubmitButton(),
        ]);
      },
    );
  for (const { first, second, note } of validFormCases) {
    test(
      `should request's body be the same as submitted values ${note}`,
      { tag: ["@test"] },
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
