import { test as base, ConsoleMessage } from "@playwright/test";

export const test = base.extend({
  page: async ({ page }, use) => {
    const errors: string[] = [];

    await page.setViewportSize({ width: 1920, height: 1080 });
    page.on("console", async (msg: ConsoleMessage) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
        console.log(`[browser console error] ${msg.text()}`); 
        // throw new Error("console Error");
      }
    });

    // additional needed logic

    await use(page);
  },
});
