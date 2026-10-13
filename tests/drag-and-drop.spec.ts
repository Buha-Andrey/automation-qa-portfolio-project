import { expect, Page } from "@playwright/test";
import { test } from "../fixtures/fixturePages";
import { dragAndDropData } from "../test-data/test-data";

test.describe("positive", () => {
  test.beforeEach(async ({ dragAndDropPage }) => {
    await dragAndDropPage.open();
  });

  test(
    `should show initial page state`,
    { tag: ["@test"] },
    async ({ dragAndDropPage }) => {
      await expect(dragAndDropPage.dragAndDrop.getRedSquare_1()).toHaveText(
        dragAndDropData.initial.red_1Title,
      );
      await expect(dragAndDropPage.dragAndDrop.getRedSquare_2()).toHaveText(
        dragAndDropData.initial.red_2Title,
      );
      await expect(dragAndDropPage.dragAndDrop.getYellowSquare_1()).toHaveText(
        dragAndDropData.initial.yellow_1Title,
      );
      await expect(dragAndDropPage.dragAndDrop.getYellowSquare_2()).toHaveText(
        dragAndDropData.initial.yellow_2Title,
      );
    },
  );
  for (const {
    yellow_1Title,
    yellow_2Title,
    red_1Title,
    red_2Title,
    description,
    yellow,
    red,
  } of dragAndDropData.dragging)
    test(
      `should show text "Dropped!" after ${description}`,
      { tag: ["@test"] },
      async ({ dragAndDropPage }) => {
        await dragAndDropPage.dragAndDrop.dragSquareTo(
          dragAndDropPage.dragAndDrop.getYellowSquare(yellow),
          dragAndDropPage.dragAndDrop.getRedSquare(red),
        );
        await expect(dragAndDropPage.dragAndDrop.getRedSquare_1()).toHaveText(
          red_1Title,
        );
        await expect(dragAndDropPage.dragAndDrop.getRedSquare_2()).toHaveText(
          red_2Title,
        );
        await expect(
          dragAndDropPage.dragAndDrop.getYellowSquare_1(),
        ).toHaveText(yellow_1Title);
        await expect(
          dragAndDropPage.dragAndDrop.getYellowSquare_2(),
        ).toHaveText(yellow_2Title);
      },
    );

  test(
    `should show "Drop Here" title for both red squares after clicking "Ctrl" button`,
    { tag: ["@test"] },
    async ({ dragAndDropPage, page: Page }) => {
      await Page.keyboard.press("Control");
      await expect(dragAndDropPage.dragAndDrop.getRedSquare_1()).toHaveText(
        dragAndDropData.ctrl.red_1Title,
      );
      await expect(dragAndDropPage.dragAndDrop.getRedSquare_2()).toHaveText(
        dragAndDropData.ctrl.red_2Title,
      );
      await expect(dragAndDropPage.dragAndDrop.getYellowSquare_1()).toHaveText(
        dragAndDropData.ctrl.yellow_1Title,
      );
      await expect(dragAndDropPage.dragAndDrop.getYellowSquare_2()).toHaveText(
        dragAndDropData.ctrl.yellow_2Title,
      );
    },
  );

  test(
    `should show "Bwa! Ha! Ha!" title for 1st yellow square after clicking "Ctrl + b" buttons`,
    { tag: ["@test"] },
    async ({ dragAndDropPage, page: Page }) => {
      await Page.keyboard.press("Control+b");

      await expect(dragAndDropPage.dragAndDrop.getRedSquare_1()).toHaveText(
        dragAndDropData.ctrlB.red_1Title,
      );
      await expect(dragAndDropPage.dragAndDrop.getRedSquare_2()).toHaveText(
        dragAndDropData.ctrlB.red_2Title,
      );
      await expect(dragAndDropPage.dragAndDrop.getYellowSquare_1()).toHaveText(
        dragAndDropData.ctrlB.yellow_1Title,
      );
      await expect(dragAndDropPage.dragAndDrop.getYellowSquare_2()).toHaveText(
        dragAndDropData.ctrlB.yellow_2Title,
      );
    },
  );

  test(
    `should show "Let GO!!!" title for both red squares after clicking "Ctrl + Space" buttons`,
    { tag: ["@test"] },
    async ({ dragAndDropPage, page: Page }) => {
      // await Page.keyboard.press("Control+Space");
      await Page.keyboard.down("Control");
      await Page.keyboard.down("Space");
      await expect(dragAndDropPage.dragAndDrop.getRedSquare_1()).toHaveText(
        dragAndDropData.ctrlSpace.red_1Title,
      );
      await expect(dragAndDropPage.dragAndDrop.getRedSquare_2()).toHaveText(
        dragAndDropData.ctrlSpace.red_2Title,
      );
      await expect(dragAndDropPage.dragAndDrop.getYellowSquare_1()).toHaveText(
        dragAndDropData.ctrlSpace.yellow_1Title,
      );
      await expect(dragAndDropPage.dragAndDrop.getYellowSquare_2()).toHaveText(
        dragAndDropData.ctrlSpace.yellow_2Title,
      );
    },
  );
});
