import { expect } from "@playwright/test";
import { test } from "../fixtures/fixturePages";

test.beforeEach(async ({ externalContentPage }) => {
  await externalContentPage.open();
});

test(
  `should show YouTube iframe when page is opened`,
  { tag: ["@externalContent", "@smoke", "@fix"] },
  async ({ externalContentPage }) => {
    await expect(externalContentPage.youtubeFrame.iFrame).toBeVisible();
  },
);

test(
  `should show audio iframe when page is opened`,
  { tag: ["@externalContent", "@smoke"] },
  async ({ externalContentPage }) => {
    await expect(externalContentPage.audioFrame.iFrame).toBeVisible();
  },
);

test(
  `should have expected "src" attribute in YouTube iframe`,
  { tag: ["@externalContent", "@regression"] },
  async ({ externalContentPage }) => {
    await expect(externalContentPage.youtubeFrame.iFrame).toHaveAttribute(
      "src",
      /youtube\.com\/embed\/w8kptQrdrmo\?si=K0hdnFx7IO2A82Nx/,
    );
  },
);

test(
  `should have expected "src" attribute in audio iframe`,
  { tag: ["@externalContent", "@regression"] },
  async ({ externalContentPage }) => {
    await expect(externalContentPage.audioFrame.iFrame).toHaveAttribute(
      "src",
      /play\.pod\.co\/the-evil-tester-show\/halloween-special-2017-seeking-out-and-dealing-with-anomalous-phenomena/,
    );
  },
);

test(
  `should load expected URL in YouTube iframe`,
  { tag: ["@externalContent", "@regression"] },
  async ({ externalContentPage }) => {
    await expect
      .poll(async () => externalContentPage.youtubeFrame.url())
      .toMatch("https://www.youtube.com/embed/w8kptQrdrmo?si=K0hdnFx7IO2A82Nx");
  },
);

test(
  `should load expected URL in audio iframe`,
  { tag: ["@externalContent", "@regression"] },
  async ({ externalContentPage }) => {
    await expect
      .poll(async () => externalContentPage.audioFrame.url())
      .toMatch(
        "https://play.pod.co/the-evil-tester-show/halloween-special-2017-seeking-out-and-dealing-with-anomalous-phenomena",
      );
  },
);
