import { expect } from "@playwright/test";
import { test } from "../fixtures/fixturePages";
import {
  alert,
  confirm,
  promptTrue,
  promptFalse,
  dialogMessage,
  promptEdgeCases,
} from "../test-data/test-data";

test.describe("positive", () => {
  test.beforeEach(async ({ alertsJavascriptPage }) => {
    await alertsJavascriptPage.open();
  });

  test(
    `should display JS alert box with expected message when trigger button is clicked`,
    { tag: ["@test"] },
    async ({ alertsJavascriptPage }) => {
      const dialog = await alertsJavascriptPage.AlertsJavascript.triggerAlert();
      expect(dialog.type()).toBe("alert");
      expect(dialog.message()).toBe(dialogMessage.alert);
      await dialog.accept();
    },
  );

  test(
    `should close JS alert box and show success result when alert is accepted`,
    { tag: ["@test"] },
    async ({ alertsJavascriptPage }) => {
      const dialog = await alertsJavascriptPage.AlertsJavascript.triggerAlert();
      await dialog.accept();

      await expect(
        alertsJavascriptPage.AlertsJavascript.getAlertExplanationMessage(),
      ).toHaveText(alert.explanation);
    },
  );

  test(
    `should display JS confirm box with expected message when trigger button is clicked`,
    { tag: ["@test"] },
    async ({ alertsJavascriptPage }) => {
      const dialog =
        await alertsJavascriptPage.AlertsJavascript.triggerConfirm();
      expect(dialog.type()).toBe("confirm");
      expect(dialog.message()).toBe(dialogMessage.confirm);
      await dialog.accept();
    },
  );

  test(
    `should close JS confirm box and show success result when alert is accepted`,
    { tag: ["@test"] },
    async ({ alertsJavascriptPage }) => {
      const dialog =
        await alertsJavascriptPage.AlertsJavascript.triggerConfirm();
      await dialog.accept();

      await expect(
        alertsJavascriptPage.AlertsJavascript.getConfirmExplanationMessage(),
      ).toHaveText(confirm.explanationTrue);
      await expect(
        alertsJavascriptPage.AlertsJavascript.getConfirmReturnMessage(),
      ).toHaveText(confirm.returnTrue);
    },
  );

  test(
    `should close JS confirm box and show success result when alert is canceled`,
    { tag: ["@test"] },
    async ({ alertsJavascriptPage }) => {
      const dialog =
        await alertsJavascriptPage.AlertsJavascript.triggerConfirm();
      await dialog.dismiss();

      await expect(
        alertsJavascriptPage.AlertsJavascript.getConfirmExplanationMessage(),
      ).toHaveText(confirm.explanationFalse);
      await expect(
        alertsJavascriptPage.AlertsJavascript.getConfirmReturnMessage(),
      ).toHaveText(confirm.returnFalse);
    },
  );

  test(
    `should display JS prompt dialog with expected message when trigger button is clicked`,
    { tag: ["@test"] },
    async ({ alertsJavascriptPage }) => {
      const dialog =
        await alertsJavascriptPage.AlertsJavascript.triggerPrompt();

      expect(dialog.type()).toBe("prompt");
      expect(dialog.message()).toBe(dialogMessage.prompt);

      await dialog.accept();
    },
  );

  test(
    `should close JS prompt dialog and show success result when alert is canceled`,
    { tag: ["@test"] },
    async ({ alertsJavascriptPage }) => {
      const dialog =
        await alertsJavascriptPage.AlertsJavascript.triggerPrompt();
      await dialog.dismiss();

      await expect(
        alertsJavascriptPage.AlertsJavascript.getPromptExplanationMessage(),
      ).toHaveText(promptFalse.explanationFalse);
    },
  );

  for (const { thePrompt, explanationTrue } of promptTrue) {
    test(
      `should close JS prompt dialog and show success result when test data (${thePrompt}) is entered in prompt and alert is accepted`,
      { tag: ["@test"] },
      async ({ alertsJavascriptPage }) => {
        const dialog =
          await alertsJavascriptPage.AlertsJavascript.triggerPrompt();
        dialog.accept(thePrompt);

        await expect(
          alertsJavascriptPage.AlertsJavascript.getPromptReturnMessage(),
        ).toHaveText(thePrompt);
        await expect(
          alertsJavascriptPage.AlertsJavascript.getPromptExplanationMessage(),
        ).toHaveText(explanationTrue);
      },
    );
  }
});

test.describe("negative", () => {
  test.beforeEach(async ({ alertsJavascriptPage }) => {
    await alertsJavascriptPage.open();
  });

  test.fail(
    `should displays prompt text as text and not html `,
    { tag: ["@test"] },
    async ({ alertsJavascriptPage }) => {
      const dialog =
        await alertsJavascriptPage.AlertsJavascript.triggerPrompt();
      dialog.accept(promptEdgeCases.input);

      await expect(
        alertsJavascriptPage.AlertsJavascript.getPromptReturnMessage(),
      ).toHaveText(promptEdgeCases.input);
      await expect(
        alertsJavascriptPage.AlertsJavascript.getPromptExplanationMessage(),
      ).toHaveText(promptEdgeCases.explanation);
    },
  );
});
