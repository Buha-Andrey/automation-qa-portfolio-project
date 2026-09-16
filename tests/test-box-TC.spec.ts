import { test, expect, Page } from "@playwright/test";
import { TextBoxPage } from "../pages/TextBoxPage";

let page: Page;

test.beforeEach(async ({ browser }) => {
  page = await browser.newPage();
  const textBoxPage = new TextBoxPage(page);

  await textBoxPage.open();
});

test("workflow test: ", async ({}) => {
  const textBoxPage = new TextBoxPage(page);
  await textBoxPage.textBox.getFullNameInput().click();
  await textBoxPage.textBox.fillFullNameInput("Test Name");
  await textBoxPage.textBox.fillEmailInput("test@test.com");
  await textBoxPage.textBox.fillCurrentAddressTextarea("current address text");
  await textBoxPage.textBox.fillPermanentAddressTextarea(
    "permanent address text",
  );
  await textBoxPage.textBox.clickSubmitButton();

  await expect(textBoxPage.textBox.getSubmittedFullName()).toContainText(
    "Name:" + "Test Name",
  );
});
