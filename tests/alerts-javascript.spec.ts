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

test.beforeEach(async ({ alertsJavascriptPage }) => {
  await alertsJavascriptPage.open();
});

test(
  `should show JS alert with expected message when Alert button is clicked`,
  { tag: ["@alerts", "@regression", "@flaky"] },
  async ({ alertsJavascriptPage }) => {
    const dialog = await alertsJavascriptPage.AlertsJavascript.triggerAlert();
    expect(dialog.type()).toBe("alert");
    expect(dialog.message()).toBe(dialogMessage.alert);
    await dialog.accept();
  },
);

test(
  `should show success message after JS alert is accepted`,
  { tag: ["@alerts", "@smoke"] },
  async ({ alertsJavascriptPage }) => {
    const dialog = await alertsJavascriptPage.AlertsJavascript.triggerAlert();
    await dialog.accept();

    await expect(
      alertsJavascriptPage.AlertsJavascript.getAlertExplanationMessage(),
    ).toHaveText(alert.explanation);
  },
);

test(
  `should show JS confirm with expected message when Confirm button is clicked`,
  { tag: ["@alerts", "@regression", "@flaky"] },
  async ({ alertsJavascriptPage }) => {
    const dialog = await alertsJavascriptPage.AlertsJavascript.triggerConfirm();
    expect(dialog.type()).toBe("confirm");
    expect(dialog.message()).toBe(dialogMessage.confirm);
    await dialog.accept();
  },
);

test(
  `should show "true" result and success message after JS confirm is accepted`,
  { tag: ["@alerts", "@smoke"] },
  async ({ alertsJavascriptPage }) => {
    const dialog = await alertsJavascriptPage.AlertsJavascript.triggerConfirm();
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
  `should show "false" result after JS confirm is dismissed`,
  { tag: ["@alerts", "@regression"] },
  async ({ alertsJavascriptPage }) => {
    const dialog = await alertsJavascriptPage.AlertsJavascript.triggerConfirm();
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
  `should show JS prompt with expected message when Prompt button is clicked`,
  { tag: ["@alerts", "@regression", "@flaky"] },
  async ({ alertsJavascriptPage }) => {
    const dialog = await alertsJavascriptPage.AlertsJavascript.triggerPrompt();

    expect(dialog.type()).toBe("prompt");
    expect(dialog.message()).toBe(dialogMessage.prompt);

    await dialog.accept();
  },
);

test(
  `should show success message after JS prompt is dismissed`,
  { tag: ["@alerts", "@regression"] },
  async ({ alertsJavascriptPage }) => {
    const dialog = await alertsJavascriptPage.AlertsJavascript.triggerPrompt();
    await dialog.dismiss();

    await expect(
      alertsJavascriptPage.AlertsJavascript.getPromptExplanationMessage(),
    ).toHaveText(promptFalse.explanationFalse);
  },
);

for (const { thePrompt, explanationTrue } of promptTrue) {
  test(
    `should show entered text and success message after JS prompt is accepted with input (${thePrompt})`,
    { tag: ["@alerts", "@smoke"] },
    async ({ alertsJavascriptPage }) => {
      const dialog =
        await alertsJavascriptPage.AlertsJavascript.triggerPrompt();
      await dialog.accept(thePrompt);

      await expect(
        alertsJavascriptPage.AlertsJavascript.getPromptReturnMessage(),
      ).toHaveText(thePrompt);
      await expect(
        alertsJavascriptPage.AlertsJavascript.getPromptExplanationMessage(),
      ).toHaveText(explanationTrue);
    },
  );
}

test.fail(
  `should show HTML entered in JS prompt as plain text (no HTML rendering)`,
  { tag: ["@alerts", "@regression", "@known-issue"] },
  async ({ alertsJavascriptPage }) => {
    const dialog = await alertsJavascriptPage.AlertsJavascript.triggerPrompt();
    await dialog.accept(promptEdgeCases.input);

    await expect(
      alertsJavascriptPage.AlertsJavascript.getPromptReturnMessage(),
    ).toHaveText(promptEdgeCases.input);
    await expect(
      alertsJavascriptPage.AlertsJavascript.getPromptExplanationMessage(),
    ).toHaveText(promptEdgeCases.explanation);
  },
);
