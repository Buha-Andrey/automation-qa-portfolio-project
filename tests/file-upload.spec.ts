import { expect } from "@playwright/test";
import { test } from "../fixtures/fixturePages";
import { UploadData } from "../test-data/test-data";

test.describe("positive", () => {
  test.beforeEach(async ({ fileUploadPage }) => {
    await fileUploadPage.open();
  });

  test(
    `should upload file after clicking "Drag & Drop your file here or click to upload" zone`,
    { tag: ["@test"] },
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
    `should upload file after dragging a file on to the the "Drag & Drop your file here or click to upload" zone`,
    { tag: ["@test"] },
    async ({ fileUploadPage }) => {
      await fileUploadPage.fileUploadComponent.uploadViaDropV_1();

      await expect(
        fileUploadPage.fileUploadComponent.getSuccessMessage(),
      ).toBeVisible();
    },
  );

  test(
    `should upload file after clicking “Choose file” button, filling the form and clicking Upload`,
    { tag: ["@test"] },
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
    `should upload file using setInputFiles() on “Choose file” button, filling the form and clicking Upload`,
    { tag: ["@test"] },
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
    `should send request after uploading file via “Choose file” button`,
    { tag: ["@test"] },
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
    `should send request after uploading file via "Drag & Drop your file here or click to upload" zone`,
    { tag: ["@test"] },
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
