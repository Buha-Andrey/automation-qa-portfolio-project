/* eslint-disable playwright/no-conditional-expect */
/* eslint-disable playwright/no-conditional-in-test */
import { expect } from "@playwright/test";
import { test } from "../fixtures/fixturePages";
import { iFrameWebsites } from "../test-data/test-data";

test.describe("positive", () => {
  test.beforeEach(async ({ externalSitePage }) => {
    await externalSitePage.open();
  });

  for (const { option, site } of iFrameWebsites) {
    test(
      `should set iframe "src" to the selected website (${site})`,
      { tag: ["@externalSite", "@regression"] },
      async ({ externalSitePage }) => {
        await externalSitePage.selectWebsite(option);
        await expect(externalSitePage.embeddedSite.iFrame).toHaveAttribute(
          "src",
          option,
        );
      },
    );
  }

  for (const { option, site, embeddable } of iFrameWebsites) {
    test(
      `should load selected website in iframe ${option}`,
      { tag: ["@externalSite", "@smoke"] },
      async ({ externalSitePage }) => {
        const [response] = await Promise.all([
          externalSitePage.waitForIFrameResponse(site),
          externalSitePage.selectWebsite(option),
        ]);
        if (embeddable) {
          expect(response.status()).toBe(200);
          await expect
            .poll(async () => await externalSitePage.embeddedSite.url())
            .toMatch(site);
        } else {
          await expect
            .poll(async () => await externalSitePage.embeddedSite.url())
            .not.toMatch(site);
        }
      },
    );
  }
});
