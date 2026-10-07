import { expect } from "@playwright/test";
import { test } from "../fixtures/fixturePages";

test.describe("positive", () => {
  test.beforeEach(async ({ externalContentPage }) => {
    await externalContentPage.open();
  });

  test(
    `should youtube iframe be visible on page`,
    { tag: ["@test"] },
    async ({ externalContentPage }) => {
      expect(externalContentPage.youtubeFrame.iFrame).toBeVisible();
    },
  );

  test(
    `should audio iframe be visible on page`,
    { tag: ["@test"] },
    async ({ externalContentPage }) => {
      await expect(externalContentPage.audioFrame.iFrame).toBeVisible();
    },
  );

  test(
    `should match source of youtube iframe`,
    { tag: ["@test"] },
    async ({ externalContentPage }) => {
      await expect(externalContentPage.youtubeFrame.iFrame).toHaveAttribute(
        "src",
        /youtube\.com\/embed\/w8kptQrdrmo\?si=K0hdnFx7IO2A82Nx/,
      );
    },
  );

  test(
    `should match source of audio iframe`,
    { tag: ["@test"] },
    async ({ externalContentPage }) => {
      await expect(externalContentPage.audioFrame.iFrame).toHaveAttribute(
        "src",
        /play\.pod\.co\/the-evil-tester-show\/halloween-special-2017-seeking-out-and-dealing-with-anomalous-phenomena/,
      );
    },
  );

  test(
    `should match URL of youtube iframe`,
    { tag: ["@test"] },
    async ({ externalContentPage }) => {
      await expect
        .poll(async () => externalContentPage.youtubeFrame.url())
        .toMatch(
          "https://www.youtube.com/embed/w8kptQrdrmo?si=K0hdnFx7IO2A82Nx",
        );
    },
  );

  test(
    `should match URL of audio iframe`,
    { tag: ["@test"] },
    async ({ externalContentPage }) => {
      await expect
        .poll(async () => externalContentPage.audioFrame.url())
        .toMatch(
          "https://play.pod.co/the-evil-tester-show/halloween-special-2017-seeking-out-and-dealing-with-anomalous-phenomena",
        );
    },
  );
});
