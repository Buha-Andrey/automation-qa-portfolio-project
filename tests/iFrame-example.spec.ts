import { expect } from "@playwright/test";
import { test } from "../fixtures/fixturePages";
import { iFrameListData, iFrameIncrementNumber } from "../test-data/test-data";

test.describe("iFrame list", () => {
  test.beforeEach(async ({ iframeExamplesPage }) => {
    await iframeExamplesPage.open();
  });

  for (const { item, itemID } of iFrameListData) {
    test(
      `should show expected text for list item #${itemID} (${item})`,
      { tag: ["@iFrame", "@regression"] },
      async ({ iframeExamplesPage }) => {
        await expect(iframeExamplesPage.getListItem(itemID)).toHaveText(item);
      },
    );
  }

  test(
    `should show "iFrame" as list title when page is opened`,
    { tag: ["@iFrame", "@regression"] },
    async ({ iframeExamplesPage }) => {
      await expect(iframeExamplesPage.getListTitle()).toHaveText("iFrame");
    },
  );
});

test.describe("iFrame Increment Number", () => {
  test.beforeEach(async ({ iframeExamplesPage }) => {
    await iframeExamplesPage.open();
  });

  test(
    `should show total 100 after adding positive amount (100) with Add button`,
    { tag: ["@iFrame", "@smoke"] },
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
    `should show total -100 after adding negative amount (-100) with Add button`,
    { tag: ["@iFrame", "@regression"] },
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
