import { expect } from "@playwright/test";
import { ajaxCategory } from "../test-data/test-data";
import { test } from "../fixtures/fixturePages";

// let page: Page;
// let multipleElementsPage: MultipleElementsPage;

test.describe("positive", () => {
  test.beforeEach(async ({ ajaxFormPage }) => {
    await ajaxFormPage.open();
  });

  for (const { value, category } of ajaxCategory) {
    test(
      `should select category (${category})`,
      { tag: ["@test"] },
      async ({ ajaxFormPage }) => {
        await ajaxFormPage.AjaxForm.selectCategory(value);
        await expect(ajaxFormPage.AjaxForm.getCategory()).toHaveValue(value);
        await expect(
          ajaxFormPage.AjaxForm.getCategory().locator("option:checked"),
        ).toHaveText(category);
      },
    );
  }
  for (const { value, category, languages } of ajaxCategory) {
    for (const { languageValue, language } of languages) {
      test(
        `should select language ${language} for category (${category})`,
        { tag: ["@test"] },
        async ({ ajaxFormPage }) => {
          await ajaxFormPage.AjaxForm.selectCategory(value);
          await ajaxFormPage.AjaxForm.waitTillAjaxLoaderIsHidden();
          await ajaxFormPage.AjaxForm.selectLanguage(languageValue);
          await expect(ajaxFormPage.AjaxForm.getLanguage()).toHaveValue(
            languageValue,
          );
          await expect(
            ajaxFormPage.AjaxForm.getLanguage().locator("option:checked"),
          ).toHaveText(language);
        },
      );
    }
  }

  test(
    `should display all categories in the expected order`,
    {},
    async ({ ajaxFormPage }) => {
      let arrCategory = ajaxCategory.map(({ category }) => category);
      await expect(ajaxFormPage.AjaxForm.getCategoryOptions()).toHaveText(
        arrCategory,
      );
    },
  );

  for (const { value, category, languages } of ajaxCategory) {
    test(
      `should display all languages in the expected order for ${category}`,
      {},
      async ({ ajaxFormPage }) => {
        await ajaxFormPage.AjaxForm.selectCategory(value);
        await ajaxFormPage.AjaxForm.waitTillAjaxLoaderIsHidden();
        let arrLanguage = languages.map(({ language }) => language);
        await expect(ajaxFormPage.AjaxForm.getLanguageOptions()).toHaveText(
          arrLanguage,
        );
      },
    );
  }

  for (const { value, category, languages } of ajaxCategory) {
    for (const { languageValue, language } of languages) {
      test(
        `should display correct submitted values according to language ${language} for category (${category})`,
        { tag: ["@test"] },
        async ({ ajaxFormPage }) => {
          await ajaxFormPage.AjaxForm.selectCategory(value);
          await ajaxFormPage.AjaxForm.waitTillAjaxLoaderIsHidden();
          await ajaxFormPage.AjaxForm.selectLanguage(languageValue);
          await ajaxFormPage.AjaxForm.clickButton();
          await expect(ajaxFormPage.AjaxForm.getSuccessMessage()).toContainText(
            "You submitted the form.",
          );
          await expect(ajaxFormPage.AjaxForm.getSubmittedCategory()).toHaveText(
            value,
          );
          await expect(ajaxFormPage.AjaxForm.getSubmittedLanguage()).toHaveText(
            languageValue,
          );
          await expect(
            ajaxFormPage.AjaxForm.getSubmittedButton(),
          ).toBeVisible();
          await expect(ajaxFormPage.AjaxForm.getClearButton()).toBeVisible();
        },
      );
    }
  }
  for (const { value, category, languages } of ajaxCategory) {
    for (const { languageValue, language } of languages) {
      test(
        `should clear results when ClearResultButton is clicked (${language},${category})`,
        { tag: ["@test"] },
        async ({ ajaxFormPage }) => {
          await ajaxFormPage.AjaxForm.selectCategory(value);
          await ajaxFormPage.AjaxForm.waitTillAjaxLoaderIsHidden();
          await ajaxFormPage.AjaxForm.selectLanguage(languageValue);
          await ajaxFormPage.AjaxForm.clickButton();
          await ajaxFormPage.AjaxForm.clickClearButton();
          await expect(ajaxFormPage.AjaxForm.getSuccessMessage()).toBeHidden();
        },
      );
    }
  }

  test.fail(
    `should keep SubmitButton inactive until AjaxLoader is shown`,
    { tag: ["@test"] },
    async ({ ajaxFormPage }) => {
      await ajaxFormPage.AjaxForm.selectCategory(ajaxCategory[1].value);
      // await expect(ajaxFormPage.AjaxForm.getAjaxLoader()).toBeHidden();
      await expect(ajaxFormPage.AjaxForm.getButton()).toBeDisabled();
    },
  );
});

test.describe("network", () => {
  test.beforeEach(async ({ ajaxFormPage }) => {
    await ajaxFormPage.open();
  });

  for (const [index, { category }] of ajaxCategory.entries()) {
    test(
      `should send request when category is changed (${category})`,
      { tag: ["@test"] },
      async ({ ajaxFormPage }) => {
        const nextIndex = (index + 1) % ajaxCategory.length;
        const nextValue = ajaxCategory[nextIndex].value;
        const nextResponse = ajaxCategory[nextIndex].response;
        await ajaxFormPage.AjaxForm.selectCategory(nextValue);
        const responseAPI =
          await ajaxFormPage.AjaxForm.waitForChangeCategoryApiResponse(
            nextValue,
          );
        expect(await responseAPI.json()).toMatchObject(nextResponse);
      },
    );
  }

  for (const { value, category, languages } of ajaxCategory) {
    for (const { languageValue, language } of languages) {
      test(
        `should send submit request when SubmitButton is clicked (${language} of ${category})`,
        { tag: ["@test"] },
        async ({ ajaxFormPage }) => {
          await ajaxFormPage.AjaxForm.selectCategory(value);
          await ajaxFormPage.AjaxForm.waitTillAjaxLoaderIsHidden();
          await ajaxFormPage.AjaxForm.selectLanguage(languageValue);
          const [response] = await Promise.all([
            ajaxFormPage.AjaxForm.waitForSubmitApiResponse(),
            ajaxFormPage.AjaxForm.clickButton(),
          ]);

          const postData = new URLSearchParams(response.request().postData()!);
          expect(postData).not.toBeNull();
          expect(postData.get("id")).toBe(value);
          expect(postData.get("language_id")).toBe(languageValue);
        },
      );
    }
  }
});


