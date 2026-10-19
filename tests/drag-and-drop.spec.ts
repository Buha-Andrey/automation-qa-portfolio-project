import { expect } from "@playwright/test";
import { test } from "../fixtures/fixturePages";
import { dragAndDropData } from "../test-data/test-data";

test.describe("positive", () => {
  test.beforeEach(async ({ dragAndDropPage }) => {
    await dragAndDropPage.open();
  });

  test(
    `should show initial titles on all squares when page is opened`,
    { tag: ["@drag&drop", "@regression"] },
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

  // net::ERR_CONNECTION_TIMED_OUT at https://testpages.eviltester.com/pages/interaction/drag-drop/
  for (const {
    yellow_1Title,
    yellow_2Title,
    red_1Title,
    red_2Title,
    yellow,
    red,
  } of dragAndDropData.dragging)
    test(
      `should update square titles after dragging yellow square ${yellow} to red square ${red}`,
      { tag: ["@drag&drop", "@flaky", "@smoke"] },
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
    `should show "Drop Here" on both red squares when Ctrl is pressed`,
    { tag: ["@drag&drop", "@smoke"] },
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
    `should show "Bwa! Ha! Ha!" on first yellow square when Ctrl+B is pressed`,
    { tag: ["@drag&drop", "@regression"] },
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
    `should show "Let GO!!!" on both red squares when Ctrl+Space is held`,
    { tag: ["@drag&drop", "@regression"] },
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
