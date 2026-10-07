import { expect } from "@playwright/test";
import { test } from "../fixtures/fixturePages";
import { iFrameListData, iFrameIncrementNumber } from "../test-data/test-data";

test.describe("iFrame list", () => {
  test.beforeEach(async ({ iframeExamplesPage }) => {
    await iframeExamplesPage.open();
  });
  for (const { item, itemID } of iFrameListData) {
    test(
      `should match all iFrame items is iFrame list with test data #${itemID}`,
      { tag: ["@test"] },
      async ({ iframeExamplesPage }) => {
        await expect(iframeExamplesPage.getListTitle()).toHaveText("iFrame");
        await expect(iframeExamplesPage.getListItem(itemID)).toHaveText(item);
      },
    );
  }
});

test.describe("iFrame Increment Number", () => {
  test.beforeEach(async ({ iframeExamplesPage }) => {
    await iframeExamplesPage.open();
  });
  test(
    `should increment number with 100 `,
    { tag: ["@test"] },
    async ({ iframeExamplesPage }) => {
      await iframeExamplesPage.fillAmountInput(
        iFrameIncrementNumber.positiveAmount,
      );
      await iframeExamplesPage.clickAddButton();

      await expect(iframeExamplesPage.getTotalValueInput()).toHaveValue("100");
      await expect(iframeExamplesPage.getIncrementNumberTitle()).toHaveText(
        "Increment Number",
      );
    },
  );

  test(
    `should decrement number with 100 `,
    { tag: ["@test"] },
    async ({ iframeExamplesPage }) => {
      await iframeExamplesPage.fillAmountInput(
        iFrameIncrementNumber.negativeAmount,
      );
      await iframeExamplesPage.clickAddButton();

      await expect(iframeExamplesPage.getTotalValueInput()).toHaveValue("-100");
      await expect(iframeExamplesPage.getIncrementNumberTitle()).toHaveText(
        "Increment Number",
      );
    },
  );
});
