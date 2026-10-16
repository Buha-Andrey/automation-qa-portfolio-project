import { expect } from "@playwright/test";
import { test } from "../fixtures/fixturePages";
import { UploadData } from "../test-data/test-data";

test.describe("positive", () => {
  test.beforeEach(async ({ fileUploadPage }) => {
    await fileUploadPage.open();
  });

  test(
    `should show success message after file is uploaded by clicking the drop zone`,
    { tag: ["@fileUpload", "@regression"] },
    async ({ fileUploadPage }) => {
      await fileUploadPage.fileUploadComponent.uploadViaFileChooserV_1(
        UploadData.fileName,
        UploadData.fileBuffer,
      );
      await expect(
        fileUploadPage.fileUploadComponent.getSuccessMessage(),
      ).toBeVisible();
    },
  );

  test(
    `should show success message after file is dropped onto the drop zone`,
    { tag: ["@fileUpload", "@smoke"] },
    async ({ fileUploadPage }) => {
      await fileUploadPage.fileUploadComponent.uploadViaDropV_1();

      await expect(
        fileUploadPage.fileUploadComponent.getSuccessMessage(),
      ).toBeVisible();
    },
  );

  test(
    `should show upload results after file is chosen with "Choose file", the form is filled and Upload is clicked`,
    { tag: ["@fileUpload", "@smoke"] },
    async ({ fileUploadPage, fileProcessorPage }) => {
      await fileUploadPage.fileUploadComponent.uploadViaFileChooserV_2(
        UploadData.fileName,
        UploadData.fileBuffer,
      );
      await fileUploadPage.fileUploadComponent.getImageRadioButton().check();
      await fileUploadPage.fileUploadComponent.clickUploadButton();

      await expect(fileProcessorPage.getUploadResults()).toBeVisible();
    },
  );

  test(
    `should show upload results after file is set in the file input, the form is filled and Upload is clicked`,
    { tag: ["@fileUpload", "@regression"] },
    async ({ fileUploadPage, fileProcessorPage }) => {
      await fileUploadPage.fileUploadComponent.uploadViaInputV_2(
        UploadData.fileName,
        UploadData.fileBuffer,
      );
      await fileUploadPage.fileUploadComponent.getGeneralRadioButton().check();
      await fileUploadPage.fileUploadComponent.clickUploadButton();

      await expect(fileProcessorPage.getUploadResults()).toBeVisible();
    },
  );
});

test.describe("network", () => {
  test.beforeEach(async ({ fileUploadPage }) => {
    await fileUploadPage.open();
  });

  test(
    `should send POST request after uploading file via “Choose file” button`,
    { tag: ["@fileUpload", "@smoke"] },
    async ({ fileUploadPage }) => {
      await fileUploadPage.fileUploadComponent.uploadViaFileChooserV_2(
        UploadData.fileName,
        UploadData.fileBuffer,
      );
      await fileUploadPage.fileUploadComponent.getImageRadioButton().check();
      const [response] = await Promise.all([
        fileUploadPage.fileUploadComponent.waitForUploadResponse(),
        fileUploadPage.fileUploadComponent.clickUploadButton(),
      ]);
      expect(response.request().method()).toBe("POST");
      expect(response.request().headers()["content-type"]).toContain(
        "multipart/form-data",
      );
    },
  );

  test(
    `should send POST request when file is dropped onto the drop zone`,
    { tag: ["@fileUpload", "@smoke"] },
    async ({ fileUploadPage }) => {
      const [response] = await Promise.all([
        fileUploadPage.fileUploadComponent.waitForUploadResponse(),
        fileUploadPage.fileUploadComponent.uploadViaDropV_1(),
      ]);
      expect(response.request().method()).toBe("POST");
      expect(response.request().headers()["content-type"]).toContain(
        "multipart/form-data",
      );
    },
  );
});
